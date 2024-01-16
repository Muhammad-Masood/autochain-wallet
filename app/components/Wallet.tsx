"use client";

import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { ClipboardCopy, SendHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Balance from "./Balance";
import axios from "axios";
import Transfer from "./Transfer";

type WalletData = {
  balance: number;
  networkName: string;
};

const Wallet = ({ wallet }: { wallet: ethers.HDNodeWallet }) => {
  const [data, setData] = useState<WalletData>({
    balance: 0,
    networkName: "",
  });
  const [isTransfer, setIsTransfer] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  //smile gown remain vintage cinnamon section fluid symbol price rely tragic snow
  const { address } = wallet;

  const setActiveSection = (mode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("active", mode);
    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL
      );
      const balance: number = Number(
        ethers.formatEther(await provider.getBalance(address))
      );
      const networkName: string = (await provider.getNetwork()).name;
      setData({ balance, networkName });
    };
    fetchBalance();
  }, []);

  return (
    <>
      {isTransfer ? (
        <Transfer />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2 flex flex-col items-center bg-slate-900 p-6 rounded-xl">
            <p className="text-xl font-medium">My Account</p>
            <p
              className="cursor-pointer flex gap-x-3 items-center text-sm"
              onClick={() => navigator.clipboard.writeText(wallet.address)}
            >
              {wallet.address.slice(0, 10)}...
              <ClipboardCopy className="w-[0.8rem] h-[0.8rem]" />
            </p>

            {/* Balance */}
            <div className="flex space-x-3">
              {/* <Balance address={wallet.address}/> */}
              <p>{data.balance}</p>
              <p className="">{data.networkName.toUpperCase()}</p>
            </div>
            {/* Tranfer native coin */}

            <div className="pt-4">
              <Button
                variant={"outline"}
                className="flex gap-x-2 items-center"
                onClick={() => setIsTransfer(true)}
              >
                <p>Transfer</p>
                <SendHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tokens NFTs and Activity */}

          <div className="flex space-x-7">
            <p
              className="cursor-pointer"
              onClick={() => setActiveSection("tokens")}
            >
              Tokens
            </p>
            <p
              className="cursor-pointer"
              onClick={() => setActiveSection("NFTs")}
            >
              NFTs
            </p>
            <p
              className="cursor-pointer"
              onClick={() => setActiveSection("Activity")}
            >
              Activity
            </p>
          </div>

          {/* Tokens */}
          {/* NFTs */}
          {/* Activity */}
        </div>
      )}
    </>
  );
};

export default Wallet;
