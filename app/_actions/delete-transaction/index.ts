"use server";

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server";
import { deleteTransactionSchema, DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (params: DeleteTransactionSchema) => {
  // Check if user is authenticated:
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate params:
  deleteTransactionSchema.parse(params); // will throw error if params are not valid

  // Create transaction:
  await db.transaction.delete({
    where: {
      id: params.transactionId,
    },
  });

  // Update transactions listing page and home page:
  revalidatePath(`/transactions`);
  revalidatePath(`/`);
};