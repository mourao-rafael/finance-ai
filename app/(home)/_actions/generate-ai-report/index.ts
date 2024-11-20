"use server";

import { formatCurrency } from "@/app/_actions/_utils/currency";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Transaction } from "@prisma/client";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  // Check if user is authenticated:
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Check authorization:
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium';
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  // Validate parameters:
  generateAiReportSchema.parse({ month });

  // Fetch transactions of the given month:
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      }
    }
  });

  // Create prompt:
  const mappedTransactions = transactions.map((transaction: Transaction) =>
    `${transaction.date.toLocaleDateString("pt-BR")}-${formatCurrency(Number(transaction.amount))}-${transaction.type}-${transaction.category}`
  ).join(";");

  const completionUserContent = `Generate a report with insights about my finances, with tips and orientations on how to improve my financial life. The transactions are divided by semicolon. The structure of each transaction is {DATE}-{TYPE}-{VALUE}-{CATEGORY}. The transactions are: ${mappedTransactions}`;

  // Send data to OpenAI
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert in managing and organizing personal finances. You help people better organize their finances.",
      },
      {
        role: "user",
        content: completionUserContent,
      }
    ]
  })

  // Return report to user:
  return completion.choices[0].message.content;
}