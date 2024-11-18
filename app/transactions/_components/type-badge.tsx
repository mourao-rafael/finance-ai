import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="font-bold bg-primary/[0.08] hover:bg-muted text-primary">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Deposit
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="font-bold text-danger bg-danger bg-opacity-[.08]">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Expense
      </Badge>
    );
  }

  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="font-bold text-white bg-white bg-opacity-[.08]">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investment
      </Badge>
    );
  }

  return transaction.type;
};

export default TransactionTypeBadge;
