import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

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

  const dashboardData = await getDashboard(month);

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">
        {/* Page title: */}
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          {/* Left section: */}
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboardData} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboardData} />
            </div>
          </div>

          {/* Right section: */}
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default Home;