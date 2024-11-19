import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const fetchSum = async (type: TransactionType) => {
    return Number(
      (
        await db.transaction.aggregate({
          where: {
            date: {
              gte: new Date(`2024-${month}-01`),
              lt: new Date(`2024-${month}-31`),
            },
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

  // Render summary cards:
  return (
    <div className="space-y-6">
      {/* Balance card: */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Balance"
        amount={balance}
        size="large"
      />

      {/* Balance details cards: */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} className="text-white" />}
          title="Invested"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Income"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Expenses"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
};

export default SummaryCards;
