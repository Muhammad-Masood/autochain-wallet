"use client";
import { ethers } from "ethers";
import { createContext, useState } from "react";


export const WalletContext = createContext<any>([]);
export function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wallet, setWallet] = useState<ethers.HDNodeWallet | undefined>(
    undefined
  );
  const w = ethers.Wallet.fromPhrase("smile gown remain vintage cinnamon section fluid symbol price rely tragic snow");
  return (
    <WalletContext.Provider value={[w, setWallet]}>
      {children}
    </WalletContext.Provider>
  );
}
