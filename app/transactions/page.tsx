import { db } from "../_lib/prisma";
import { Button } from "../_components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  // Fetch all transactions from the database:
  const transactions = await db.transaction.findMany({});

  // Create transactions table:
  return (
    <div className="p-6 space-y-6">
      {/* PAGE TITLE + BUTTON: */}
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold text-2xl">Transactions</h1>
        <Button className="rounded-full">
          Add transaction
          <ArrowDownUpIcon className="ml-2" />
        </Button>
      </div>

      {/* LISTING TABLE: */}
      <DataTable
        columns={transactionColumns}
        data={transactions}
      />
    </div>
  )
};

export default TransactionsPage;
