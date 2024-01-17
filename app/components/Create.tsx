"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { ClipboardCopy } from "lucide-react";
import toast from "react-hot-toast";

const Create = () => {
  const [newSeedPhrase, setNewSeedPhrase] = useState<string>("");

  const createWallet = () => {
    const mnemonic: string = ethers.Wallet.createRandom().mnemonic!.phrase;
    setNewSeedPhrase(mnemonic);
    toast.success("Wallet created successfully.");
  };

  return (
    <>
      <div className="space-y-11">
        <p className="">
          Once you generate the seed phrase, save it securely in order to
          recover your wallet in the future.
        </p>
        <Card className="h-[200px]">
          <CardHeader>
            <CardDescription className="cursor-pointer" onClick={() => navigator.clipboard.writeText(newSeedPhrase)}>{newSeedPhrase}</CardDescription>
          </CardHeader>
        </Card>
        <div className="flex justify-between">
        <Button>Back</Button>
        <Button onClick={createWallet}>Generate Seed Phrase</Button>
        </div>
      </div>
    </>
  );
};

export default Create;
