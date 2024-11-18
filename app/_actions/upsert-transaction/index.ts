"use server"

import { db } from "@/app/_lib/prisma"
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client"
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertTransaction = async (params: Omit<Prisma.TransactionCreateInput, 'userId'>) => {
  // Check if user is authenticated:
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Validate params:
  upsertTransactionSchema.parse(params); // will throw error if params are not valid

  // Create transaction:
  await db.transaction.upsert({
    where: {
      id: params.id || '',
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });

  // Update transactions listing page:
  revalidatePath(`/transactions`);
};