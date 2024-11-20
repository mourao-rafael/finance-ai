import { formatCurrency } from "@/app/_actions/_utils/currency";
import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: 'small' | 'large';
  userCanAddTransaction?: boolean;
}

const SummaryCard = async ({ icon, title, amount, size = 'small', userCanAddTransaction }: SummaryCardProps) => {
  return (
    <Card className={size === "large" ? "bg-white bg-opacity-5" : ""}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p className={size === "small" ? "text-muted-foreground" : "text-white opcaity-70"}>{title}</p>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p className={"font-bold " + (size === "small" ? "text-2xl" : "text-4xl")}>
          {formatCurrency(amount)}
        </p>

        {size === "large" && <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />}
      </CardContent>
    </Card >
  )
};

export default SummaryCard;
