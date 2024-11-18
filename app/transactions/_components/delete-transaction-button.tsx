"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

const DeleteTransactionButton = ({ transaction }: DeleteTransactionButtonProps) => {
  return (
    <>
      <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => window.alert('To be implemented')}>
        <TrashIcon />
      </Button>

      {/* TODO - pop confirmation dialog */}
      {/*  */}
    </>
  )
};

export default DeleteTransactionButton;
