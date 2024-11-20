import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  // Check authorization:
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check if user has premium plan:
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") return true;

  // Check if user has created all the transactions this month:
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};