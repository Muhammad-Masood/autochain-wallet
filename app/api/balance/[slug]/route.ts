import { MoralisNextApi } from "@moralisweb3/next";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { NextRequest, NextResponse } from "next/server";

let isMoralisStarted: boolean = false;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isMoralisStarted) {
    Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    });
    isMoralisStarted = true;
  }
  const { slug } = params;
  const address = request.nextUrl.searchParams.get("address");
  const chain = EvmChain.BSC_TESTNET;
  if (slug === "tokens") {
    try {
      if (address) {
        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
          chain: chain,
          address: address,
        });
        return NextResponse.json({ tokens: tokens });
      } else {
        return NextResponse.json({ message: "Missing query parameters." });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else if (slug === "native") {
    try {
      if (address) {
        const balance = await Moralis.EvmApi.balance.getNativeBalance({
          address,
          chain,
        });
        return NextResponse.json({ balance: balance.result.balance.ether });
      } else {
        return NextResponse.json({ message: "Missing query parameters." });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else if (slug === "nfts") {
    try {
      if (address) {
        const _nfts = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chain,
          address: address,
        });
        return NextResponse.json({ nfts: _nfts });
      } else {
        return NextResponse.json({ message: "Missing query parameters." });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else if (slug === "transactions") {
    try {
      if (address) {
        const _transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
          chain: chain,
          address: address,
        });
        return NextResponse.json({ transactions: _transactions });
      } else {
        return NextResponse.json({ message: "Missing query parameters." });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "Invalid slug." });
  }
}
