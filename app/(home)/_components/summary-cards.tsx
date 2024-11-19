import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";

interface SummaryCardsProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  balance: number;
}

const SummaryCards = async ({ depositsTotal, investmentsTotal, expensesTotal, balance }: SummaryCardsProps) => {

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
