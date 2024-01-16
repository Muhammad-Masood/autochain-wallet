"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);

  return (
    <>
      <div className="space-y-6 pt-[2rem]">
        <p className="text-3xl font-extrabold text-center leading-normal">
          Your Auto Chain Wallet
        </p>
        <p className="text-md font-medium text-center">
          Secure, Transparent, Decentralized
        </p>
      </div>

      <div className="flex flex-col gap-y-4 m-4 pt-[4rem]">
        <Button className="">
          <Link href={"/wallet/create"}>Create New Wallet</Link>
        </Button>
        <Button className="">
          <Link href={"/wallet/recover"}>SignIn With Seed Phrase</Link>
        </Button>
      </div>
    </>
  );
};

export default Home;
