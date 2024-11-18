"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { z } from "zod";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transaction";
import { DatePicker } from "./ui/date-picker";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }),
  amount: z.string().trim().min(1, { message: "Amount is required." }),
  type: z.nativeEnum(TransactionType, { required_error: "Type is required." }),
  category: z.nativeEnum(TransactionCategory, { required_error: "Category is required." }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, { required_error: "Payment method is required." }),
  date: z.date({ required_error: "Date is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddTransactionButton = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: "",
      // amount: "",
      type: TransactionType.EXPENSE,
      category: TransactionCategory.ENTERTAINMENT,
      paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
      date: new Date(),
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) form.reset() }}>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Add transaction
          <ArrowDownUpIcon className="ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
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
                    <MoneyInput placeholder="Amount" {...field} />
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
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
};

export default AddTransactionButton;
