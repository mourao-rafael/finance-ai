import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentageType } from "./types";

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    }
  };

  const fetchSum = async (type: TransactionType) => {
    return Number(
      (
        await db.transaction.aggregate({
          where: {
            ...where,
            type,
          },
          _sum: { amount: true },
        })
      )?._sum?.amount
    );
  }

  // Fetch data from the DB:
  const depositsTotal = await fetchSum("DEPOSIT");
  const investmentsTotal = await fetchSum("INVESTMENT");
  const expensesTotal = await fetchSum("EXPENSE");
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  // Calculate percentages:
  const transactionsTotal = depositsTotal + investmentsTotal + expensesTotal;
  const typesPercentage: TransactionPercentageType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  // Calculate expenses per category:
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  // Fetch last transactions:
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions
  };
}