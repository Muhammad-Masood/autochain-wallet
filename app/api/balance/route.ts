
import { isMoralisStarted } from "@/lib/utils";
import { MoralisNextApi } from "@moralisweb3/next";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");
  //   const chain = request.nextUrl.searchParams.get("chain");
  const chain = EvmChain.BSC_TESTNET;
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
}
