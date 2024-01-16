"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const transferFormSchema = z.object({
  receiver: z.string().min(42, {message: "Invalid recipient address"}).max(42, {message: "Invalid recipient address"}),
  amount: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && isFinite(parsedValue) && parsedValue > 0;
    },
    { message: "Invalid amount" }
  ),
});

const Transfer = () => {
    const form = useForm<z.infer<typeof transferFormSchema>>({
        resolver: zodResolver(transferFormSchema),
      })
     
      async function handleTransaction(values: z.infer<typeof transferFormSchema>) {
        console.log(values)
      }
  return <>
    <div className="space-y-6">
        <p className="text-xl font-medium">Transfer</p>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleTransaction)} className="space-y-8">
        <FormField
          control={form.control}
          name="receiver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input placeholder="0x1234..." {...field} />
              </FormControl>
              <FormDescription>
                This is the recipient address.
              </FormDescription>
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
                <Input placeholder="0.001" {...field} />
              </FormControl>
              <FormDescription>
                Amount to send to the recipient.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  </>;
};

export default Transfer;
