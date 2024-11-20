import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  }
};

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/login`);
  }

  // Validate month:
  const invalidMonth = !month || !isMatch(month, "MM");
  if (invalidMonth) {
    const defaultMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
    redirect(`?month=${defaultMonth}`); // default month
  }

  // Fetch data:
  const dashboardData = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6 flex flex-col overflow-hidden">
        {/* Page title: */}
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton month={month} hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"} />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          {/* Left section: */}
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards {...dashboardData} userCanAddTransaction={userCanAddTransaction} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboardData} />
              <ExpensesPerCategory expensesPerCategory={dashboardData.totalExpensePerCategory} />
            </div>
          </div>

          {/* Right section: */}
          <LastTransactions lastTransactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
}

export default Home;