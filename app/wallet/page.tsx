import axios from "axios";
import Wallet from "../components/Wallet";
import { Token, Transaction, provider } from "@/lib/utils";
import { ethers } from "ethers";

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const address = searchParams?.address;
  console.log(address);
  const balance = await provider.getBalance(address as string);
  // const balanceDataresponse: string = (
  //   await axios.get(
  //     `http://localhost:3000/api/balance/native?address=${address}`
  //   )
  // ).data.balance;
  // const tokensDataResponse: Token[] = (
  //   await axios.get(
  //     `http://localhost:3000/api/balance/tokens?address=${address}`
  //   )
  // ).data.tokens;

  // // const nftsDataResponse = (
  // //   await axios.get(`http://localhost:3000/api/balance/nfts?address=${address}`)
  // // ).data.nfts;
  // // console.log(nftsDataResponse);

  // const transactionsData:Transaction[] = (
  //   await axios.get(
  //     `http://localhost:3000/api/balance/transactions?address=${address}`
  //   )
  // ).data.transactions.result;
  // console.log(transactionsData);
  // console.log(nftsDataResponse);
  const network = await provider.getNetwork();
  return (
    <div>
      <Wallet
        walletData={{
          network: network,
          balance: ethers.formatUnits(balance),
          // tokensData: [],
          // transactions: [],
          // nfts: [],
        }}
      />
    </div>
  );
};

export default page;
