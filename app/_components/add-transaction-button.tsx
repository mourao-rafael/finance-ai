"use client";

import React from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({ userCanAddTransaction }: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={userCanAddTransaction ? "cursor-pointer" : "cursor-not-allowed"}>
              <Button
                className="rounded-full font-bold"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
              >
                Add transaction
                <ArrowDownUpIcon className="ml-2" />
              </Button>
            </span>
          </TooltipTrigger>

          {
            !userCanAddTransaction && (
              <TooltipContent>
                You cannot create more transactions this month. Upgrade to Premium Plan to create unlimited transactions.
              </TooltipContent>
            )
          }
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        dialogIsOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
      />
    </>
  )
};

export default AddTransactionButton;
