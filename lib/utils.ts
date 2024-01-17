import { type ClassValue, clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Network = {
  name: string;
  chainId: string;
};

export const networks: Network[] = [
  {
    name: "Ethereum Mainnet",
    chainId: "0x1",
  },
  {
    name: "BSC Testnet",
    chainId: "0x61",
  },
  {
    name: "BSC Mainnet",
    chainId: "0x38",
  },
  {
    name: "Polygon Mainnet",
    chainId: "0x89",
  },
];

export const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL
);

export type Token = {
  token_address: string;
  symbol: string;
  name: string;
  logo: any;
  thumbnail: any;
  decimals: number;
  balance: number;
  possible_spam: boolean,
};

export type Transaction = {
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  block_timestamp: string;
  confirmations: string;
}

export const tokenABI = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];