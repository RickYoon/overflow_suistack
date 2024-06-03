import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
// import { CLOCK_OBJECT } from "./constants.js";

export async function LendSuiNavi() {

  // reference tranactions
  // https://suivision.xyz/txblock/5E4KHy4htBd2J8H15qBQgV6KxDBhpVcpeDZjztv2Cgns

  // 트렌젝션 만들기
  const tx = new TransactionBlock();
  tx.setSender("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be");

  const CLOCK_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1,
  });

  const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe",
    mutable: true,
    initialSharedVersion: 8202844,
  });

  const DETAIL_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5",
    mutable: true,
    initialSharedVersion: 8202845,
  });

  const LAST_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xaaf735bf83ff564e1b219a0d644de894ef5bdc4b2250b126b2a46dd002331821",
    mutable: true,
    initialSharedVersion: 8202844
  });

  const NEXT_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xf87a8acb8b81d14307894d12595541a73f19933f88e1326d5be349c7a6f7559c",
    mutable: true,
    initialSharedVersion: 38232222
  });

  const coin = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

  tx.moveCall({
      target: "0xc6374c7da60746002bfee93014aeb607e023b2d6b25c9e55a152b826dbc8c1ce::incentive_v2::entry_deposit",
      typeArguments: ["0x2::sui::SUI"],
      arguments: [
        tx.object(CLOCK_OBJECT),
        tx.object(PROTOCOL_OBJECT),
        tx.object(DETAIL_OBJECT),
        tx.pure(0),        
        coin,
        tx.pure(1000000000),     
        tx.object(LAST_OBJECT),
        tx.object(NEXT_OBJECT)
      ]
    });

   
    return tx;
    
  }
