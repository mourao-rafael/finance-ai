"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({ transactionId }: DeleteTransactionSchema) => {
  const deleted = await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  // Reload pages:
  revalidatePath(`/`);
  revalidatePath(`/transactions`);

  return deleted;
}