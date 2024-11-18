import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transaction";
import { DatePicker } from "./ui/date-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { upsertTransaction } from "../_actions/upsert-transaction";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }),
  amount: z.number({ required_error: "Amount is required." }).positive({ message: "Amout must be positive." }),
  type: z.nativeEnum(TransactionType, { required_error: "Type is required." }),
  category: z.nativeEnum(TransactionCategory, { required_error: "Category is required." }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, { required_error: "Payment method is required." }),
  date: z.date({ required_error: "Date is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertTransactionDialogProps {
  dialogIsOpen: boolean;
  setDialogIsOpen: (dialogIsOpen: boolean) => void;
  defaultValues?: Partial<FormSchema>;
  transactionId?: string;
}

const UpsertTransactionDialog = ({ dialogIsOpen, setDialogIsOpen, defaultValues, transactionId }: UpsertTransactionDialogProps) => {
  const onSubmit = async (data: FormSchema) => {
    await upsertTransaction({ ...data, id: transactionId }); // create transaction in the database
    setDialogIsOpen(false); // close dialog
    form.reset(); // reset form
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      amount: 0,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.ENTERTAINMENT,
      paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
      date: new Date(),
    },
  });

  return (
    <Dialog open={dialogIsOpen} onOpenChange={(open) => { setDialogIsOpen(open); if (!open) form.reset() }}>
      <DialogTrigger asChild>

      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transactionId ? `Update` : `Add`} Transaction</DialogTitle>
          <DialogDescription>Enter the information below</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the transaction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Amount"
                      value={field.value}
                      onValueChange={({ floatValue }) => field.onChange(floatValue)}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the transaction type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        TRANSACTION_TYPE_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the payment method..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        TRANSACTION_PAYMENT_METHOD_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the category..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        TRANSACTION_CATEGORY_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{transactionId ? `Update` : `Add`}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
};

export default UpsertTransactionDialog;
