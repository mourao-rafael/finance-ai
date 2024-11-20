"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { deleteTransaction } from "../_actions/delete-transaction";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

const DeleteTransactionButton = ({ transaction }: DeleteTransactionButtonProps) => {
  const handleDeleteTransactionClick = async () => {
    try {
      await deleteTransaction({ transactionId: transaction.id });
      toast.success("Transaction deleted.");
    } catch (e) {
      console.error(e);
      toast.error("There was a problem deleting this transaction. Please, try again later.");
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`This action cannot be undone. This will permanently delete the transaction "${transaction.name}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl bg-white bg-opacity-[5%] border-none">Cancel</AlertDialogCancel>
            <AlertDialogAction className="rounded-xl bg-[#E93030] hover:bg-[#E93030] bg-opacity-70 hover:bg-opacity-100 font-bold border-none" onClick={handleDeleteTransactionClick}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};

export default DeleteTransactionButton;
