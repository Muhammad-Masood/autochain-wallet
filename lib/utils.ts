import { type ClassValue, clsx } from "clsx";
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

let isMoralisStarted: boolean = false;
export {isMoralisStarted}