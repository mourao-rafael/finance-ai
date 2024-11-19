import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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
  if(invalidMonth) {
    redirect(`?month=01`); // default month
  }

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <TimeSelect />
        </div>

        <SummaryCards month={month} />
      </div>
    </>
  );
}

export default Home;