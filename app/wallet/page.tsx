import { ethers } from "ethers";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import React from "react";

const page = async () => {
  const address = "0x87eA7aDA4348191CB0a39195BDcD93ee0EFFb880";
  const provider = new ethers.JsonRpcProvider(process.env.BSC_TESTNET_RPC_URL);
  const balance = await provider.getBalance(address);
  return <div>{ethers.formatEther(balance)}</div>;
};

export default page;
