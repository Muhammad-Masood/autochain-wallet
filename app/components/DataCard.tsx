"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Token, Transaction, provider, tokenABI } from "@/lib/utils";
import { ethers } from "ethers";
import { WalletData } from "./Wallet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { WalletContext } from "@/lib/providers/WalletContext";
import toast from "react-hot-toast";

const DataCard = ({
  data,
  mode,
}: {
  data: { tokensData: Token[]; nfts: []; transactions: Transaction[] };
  mode: string | null;
}) => {
  const { nfts, tokensData, transactions } = data;
  const [recAddress, setRecAddress] = useState("");
  const [amount, setAmount] = useState<any>();
  const [wallet] = useContext(WalletContext);
  const sendToken = async (tokenAddress: string) => {
    try {
      toast.loading("processing transaction...");
      const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider
      );
      const signer = new ethers.Wallet(wallet.privateKey, provider);
      const tokenWithSigner = tokenContract.connect(signer);
      const tx = await tokenWithSigner.transfer(recAddress, amount);
      toast.dismiss();
      if (tx) {
        toast.success("Transaction successfull.");
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(String(error).slice(0, 25));
      console.log(error);
    }
    // setIsTransProcessing(false);
    // console.log(values);
  };

  if (mode == "transactions") {
    return (
      <div>
        <ScrollArea className="h-48 w-64 rounded-md border">
          <div className="p-4">
            {tokensData.map((token: Token, index: number) => (
              <>
                <div key={index} className="text-sm flex justify-between">
                  <p>{token.name}</p>
                  <p>{ethers.formatEther(token.balance)}</p>
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  } else if (mode === "nfts") {
    return (
      <div>
        <ScrollArea className="h-48 w-64 rounded-md border">
          <div className="p-4">
            {tokensData.map((token: Token, index: number) => (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <div key={index} className="text-sm flex justify-between">
                      <p>{token.name}</p>
                      <p>{ethers.formatEther(token.balance)}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 gap-4">
                        <Label htmlFor="address" className="text-right">
                          Recipient Address
                        </Label>
                        <Input
                          id="address"
                          onChange={(e) => setRecAddress(e.target.value)}
                          className="col-span-3"
                        />
                        <Label htmlFor="amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="amount"
                          onChange={(e) =>
                            setAmount(ethers.parseEther(e.target.value))
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => sendToken(token.token_address)}
                      >
                        Send
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  } else {
    return (
      <div>
        <ScrollArea className="h-48 w-64 rounded-md border">
          <div className="p-4">
            {tokensData.map((token: Token, index: number) => (
              <>
                <div key={index} className="text-sm flex justify-between">
                  <p>{token.name}</p>
                  <p>{ethers.formatEther(token.balance)}</p>
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }
};

export default DataCard;
