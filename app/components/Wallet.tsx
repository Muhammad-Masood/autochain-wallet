"use client";

import { Button } from "@/components/ui/button";
import { Network, ethers } from "ethers";
import { ClipboardCopy, SendHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Balance from "./Balance";
import axios from "axios";
import Transfer from "./Transfer";
import { Token, Transaction, provider, tokenABI } from "@/lib/utils";
import { WalletContext } from "@/lib/providers/WalletContext";
import TokenCard from "./DataCard";
import DataCard from "./DataCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type WalletData = {
  network: Network;
  balance: string;
  // tokensData: Token[];
  // nfts: [];
  // transactions: Transaction[];
};

type TokenData = {
  name: string;
  balance: number;
};

const Wallet = ({ walletData }: { walletData: WalletData }) => {
  const { balance, network } = walletData;
  const [wallet, setWallet] = useContext(WalletContext);
  const [tokensData, setTokensData] = useState<any>([]);
  const [tokenAddress, setTokenAddress] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // smile gown remain vintage cinnamon section fluid symbol price rely tragic snow
  // const { address } = wallet;

  const setToken = async () => {
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
    const name:string = await tokenContract.name();
    const balance = await tokenContract.balanceOf(wallet.address);
    console.log(balance, name);
    setTokensData([...tokensData, {name, balance}]);
  };

  const setActiveSection = (mode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("active", mode);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <>
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
            <p>{balance}</p>
            <p className="">{network.name.toUpperCase()}</p>
          </div>

          {/* Tranfer native coin */}

          <div className="pt-4">
            <Button
              variant={"outline"}
              className="flex gap-x-2 items-center"
              onClick={() => router.replace("/wallet/transfer")}
            >
              <p>Transfer</p>
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tokens NFTs and Activity */}
        <div className="flex space-x-8 items-center justify-center">
          {["Tokens", "NFTs", "Activity"].map((mode: string) => (
            <div className="flex space-x-7">
              <p
                className="cursor-pointer"
                onClick={() => setActiveSection(mode)}
              >
                {mode}
              </p>
            </div>
          ))}
        </div>
        {tokensData.length === 0 ? (
          <Dialog>
            <DialogTrigger asChild>
              <p className="cursor-pointer">Import Tokens</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                  <Label htmlFor="address" className="text-right">
                    Token Address
                  </Label>
                  <Input
                    id="address"
                    onChange={(e) => setTokenAddress(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={setToken}>Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <DataCard
            data={{ tokensData, nfts: [], transactions: [] }}
            mode={searchParams.get("active")}
          />
        )}
        {/* <DataCard data={{tokensData, transactions, nfts}} mode={searchParams.get("active")} /> */}
      </div>
    </>
  );
};

export default Wallet;
