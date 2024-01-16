"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ethers } from "ethers";
import Wallet from "@/app/components/Wallet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [seedPhrase, setSeedPhrase] = useState<string>("");
  // const [wallet, setWallet] = useState<ethers.HDNodeWallet>();
  const router = useRouter();

  // const recoverWallet = () => {
  //   try {
  //     const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  //     setWallet(wallet);
  //     toast.success("Wallet recovered successfully.");
        //  router.replace(`/wallet?address=${wallet.address}`);
  //   } catch (error) {
  //     toast.error("Invalid seed phrase.");
  //   }
  // };

  const wallet = ethers.Wallet.fromPhrase("smile gown remain vintage cinnamon section fluid symbol price rely tragic snow");

  return (
    <>
      {wallet ? (
        <Wallet wallet={wallet} />
      ) : (
        <div className="space-y-11">
          <p className="">
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces).
          </p>
          <Input
            className="h-[100px]"
            placeholder="Type your seed phrase here."
            onChange={(e) => setSeedPhrase(e.target.value)}
          />
          <Button onClick={recoverWallet}>Recover Wallet</Button>
        </div>
      )}
    </>
  );
};

export default page;
