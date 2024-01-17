"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { provider } from "@/lib/utils";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import { WalletContext } from "@/lib/providers/WalletContext";
import { useRouter } from "next/navigation";

const phrase =
  "smile gown remain vintage cinnamon section fluid symbol price rely tragic snow";

const transferFormSchema = z.object({
  receiver: z
    .string()
    .min(42, { message: "Invalid recipient address" })
    .max(42, { message: "Invalid recipient address" }),
  amount: z.string().refine(
    (value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && isFinite(parsedValue) && parsedValue > 0;
    },
    { message: "Invalid amount" }
  ),
});

const Transfer = () => {
  const [isTransProcessing, setIsTransProcessing] = useState(false);
  const [wallet, setWallet] = useContext(WalletContext);
  const form = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
  });

  const router = useRouter();

  async function handleTransaction(values: z.infer<typeof transferFormSchema>) {
    setIsTransProcessing(true);
    try {
      toast.loading("processing transaction...");
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      const transactionResponse = await signer.sendTransaction({
        to: values.receiver,
        value: ethers.parseEther(values.amount),
      });
      const transactionReceipt = await transactionResponse.wait();
      console.log(transactionReceipt);
      toast.dismiss();
      if (transactionReceipt) {
        toast.success("Transaction successfull.");
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(String(error).slice(0, 25));
      console.log(error);
    }
    setIsTransProcessing(false);
    console.log(values);
    // toast.dismiss();
  }

  return (
    <>
      <div className="space-y-6">
        <p className="text-xl font-medium">Transfer</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleTransaction)}
            className="space-y-8"
          >
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
            <div>
              <div className="flex justify-between">
            <Button variant={"outline"} onClick={() => router.replace(`/wallet?address=${wallet.address}`)}>Back</Button>
            <Button type="submit" disabled={isTransProcessing}>
              Send
            </Button>
            </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Transfer;
