import { ethers } from "ethers"
import Moralis from "moralis"
import { EvmChain } from "moralis/common-evm-utils"


const Balance = async ({address}:{address:string}) => {
    // const provider = ethers.getDefaultProvider('sepolia', {
    //     alchemy: process.env.ALCHEMY_SEPOLIA_RPC_URL
    // });
    // const balance = await provider.getBalance(address);
    // const balanceEthers = ethers.formatEther(balance);
    // console.log(balance, balanceEthers);
    
    const chain = EvmChain.BSC_TESTNET
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain
    });

    console.log(nativeBalance.result.balance.ether);
    return (
    <div>Balance</div>
  )
}

export default Balance