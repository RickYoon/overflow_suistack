import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
// import { CLOCK_OBJECT } from "./constants.js";

export async function LendToSuilend() {

  // reference tranactions
  // https://suivision.xyz/txblock/5DG2exuXqKRMyDhRYbXRgEhA7gEPhZCagYxT5quQTMcv

  // 트렌젝션 만들기
  const tx = new TransactionBlock();
  tx.setSender("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be");

  const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x84030d26d85eaa7035084a057f2f11f701b7e2e4eda87551becbc7c97505ece1",
    mutable: true,
    initialSharedVersion: 76382579,
  });

  const CLOCK_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1,
  });

  const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

  const [res] = tx.moveCall({
      target: "0x157dbf1830dab58ec67e025c1200a32a22a31150beba4d3de8e39571547f8cc2::lending_market::deposit_liquidity_and_mint_ctokens",
      typeArguments: ["0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL","0x2::sui::SUI"],
      arguments: [
        tx.object(PROTOCOL_OBJECT),
        tx.pure(0),
        tx.object(CLOCK_OBJECT),
        coin
      ]
    });

    tx.moveCall({
      target: "0x157dbf1830dab58ec67e025c1200a32a22a31150beba4d3de8e39571547f8cc2::lending_market::deposit_ctokens_into_obligation",
      typeArguments: ["0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL","0x2::sui::SUI"],
      arguments: [
        tx.object(PROTOCOL_OBJECT),
        tx.pure(0),
        tx.object(PROTOCOL_OBJECT),
        tx.object(CLOCK_OBJECT),
        res
      ]
    });
   
    return tx;
    
  }
