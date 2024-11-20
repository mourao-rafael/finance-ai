import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/login`);
  }

  // Fetch all transactions from the database:
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    }
  });

  const userCanAddTransaction = await canUserAddTransaction();

  // Create transactions table:
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 overflow-hidden">
        {/* PAGE TITLE + BUTTON: */}
        <div className="flex w-full items-center justify-between">
          <h1 className="font-bold text-2xl">Transactions</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        {/* LISTING TABLE: */}
        <ScrollArea className="h-full">
          <DataTable
            columns={transactionColumns}
            data={transactions}
          />
        </ScrollArea>
      </div>
    </>
  )
};

export default TransactionsPage;
