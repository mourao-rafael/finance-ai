import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";

const TransactionsPage = async () => {
  // Fetch all transactions from the database:
  const transactions = await db.transaction.findMany({});

  // Create transactions table:
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        {/* PAGE TITLE + BUTTON: */}
        <div className="flex w-full items-center justify-between">
          <h1 className="font-bold text-2xl">Transactions</h1>
          <AddTransactionButton />
        </div>

        {/* LISTING TABLE: */}
        <DataTable
          columns={transactionColumns}
          data={transactions}
        />
      </div>
    </>
  )
};

export default TransactionsPage;
