import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
// import { CLOCK_OBJECT } from "./constants.js";

export async function DepositSui() {

  // reference tranactions
  // https://suivision.xyz/txblock/9PSewbAdsNW2gCuwbGTzSsAXpY6C5LFXuYZRG1ZQ2D2T

  // 트렌젝션 만들기
  const tx = new TransactionBlock();
  tx.setSender("0x79dea7c391d4d756a6a66963dff03ce97c235e918518fb8cbd99602ccde10db2");

  const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x07871c4b3c847a0f674510d4978d5cf6f960452795e8ff6f189fd2088a3f6ac7",
    mutable: false,
    initialSharedVersion: 7765848,
  });

  const ORACLE_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xa757975255146dc9686aa823b7838b507f315d704f428cbadad2f4ea061939d9",
    mutable: true,
    initialSharedVersion: 7765848,
  });

  const CLOCK_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1,
  });

  const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

  // open position: lend sui
  const buck_output_balance = tx.moveCall({
      target: "0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e::mint::mint",
      typeArguments: ["0x2::sui::SUI"],
      arguments: [
        tx.object(PROTOCOL_OBJECT),
        tx.object(ORACLE_OBJECT),
        coin,
        tx.object(CLOCK_OBJECT)
      ]
    });

    tx.transferObjects([buck_output_balance], tx.pure("0x79dea7c391d4d756a6a66963dff03ce97c235e918518fb8cbd99602ccde10db2"));
   
    return tx;
    
  }
