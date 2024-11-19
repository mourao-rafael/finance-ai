import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transaction, TransactionType } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { TRANSACTION_PAYMENT_METHOD_ICONS, TRANSACTION_AMOUNT_COLOR_CLASS_MAP } from "@/app/_constants/transaction";
import { formatCurrency } from "@/app/_actions/_utils/currency";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Last Transactions</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">View more</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {
          lastTransactions.map(transaction => (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Icon: */}
                <div className="p-3 bg-white bg-opacity-[3%] rounded-lg">
                  <Image src={TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]} height={20} width={20} alt="PIX" />
                </div>

                {/* Name and date: */}
                <div className="">
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date.toLocaleDateString()}</p>
                </div>

                {/* Value: */}
                <p className={`text-sm font-bold ${TRANSACTION_AMOUNT_COLOR_CLASS_MAP[transaction.type]}`}>
                  {(transaction.type === TransactionType.DEPOSIT ? `+` : `-`)} {/* PREFIX */}
                  {formatCurrency(Number(transaction.amount))} {/* VALUE */}
                </p>
              </div>
            </div>
          ))
        }
      </CardContent>
    </ScrollArea>
  )
};

export default LastTransactions;
