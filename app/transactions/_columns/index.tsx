"use client"

import { Transaction, TransactionCategory, TransactionPaymentMethod } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import TransactionTypeBadge from "../_components/type-badge"
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABELS = {
  [TransactionCategory.EDUCATION]: "Education",
  [TransactionCategory.ENTERTAINMENT]: "Entertainment",
  [TransactionCategory.FOOD]: "Food",
  [TransactionCategory.HEALTH]: "Health",
  [TransactionCategory.HOUSING]: "Housing",
  [TransactionCategory.OTHER]: "Other",
  [TransactionCategory.SALARY]: "Salary",
  [TransactionCategory.TRANSPORTATION]: "Transportation",
  [TransactionCategory.UTILITY]: "Utility",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  [TransactionPaymentMethod.BANK_TRANSFER]: "Bank Transfer",
  [TransactionPaymentMethod.BANK_SLIP]: "Bank Slip",
  [TransactionPaymentMethod.CASH]: "Cash",
  [TransactionPaymentMethod.CREDIT_CARD]: "Credit Card",
  [TransactionPaymentMethod.DEBIT_CARD]: "Debit Card",
  [TransactionPaymentMethod.OTHER]: "Other",
  [TransactionPaymentMethod.PIX]: "PIX",
};


export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original: transaction } }) => <TransactionTypeBadge transaction={transaction} />,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original: transaction } }) => TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row: { original: transaction } }) => TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original: transaction } }) => new Date(transaction.date).toLocaleDateString("pt-BR", {}),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original: transaction } }) => {
      const numberFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
      return numberFormatter.format(Number(transaction.amount));
    },
  },
  {
    accessorKey: "actions",
    header: '',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div>
          <Button variant="ghost" size="icon" className="text-muted-foreground"><PencilIcon /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground"><TrashIcon /></Button>
        </div>
      );
    },
  },
]
