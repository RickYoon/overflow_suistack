import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
import { NestedResult } from "@mysten/sui.js/client";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import {
    MAINNET_PROTOCOL_ID,
    MAINNET_PACKAGE_ID,
    BUCK_TYPE,
    MODULES,
    PROTOCOL_OBJECT,
    SWITCHBOARD_UPDATE_TARGET,
    ORACLE_OBJECT,
    CLOCK_OBJECT,
    SWITCHBOARD_SUI_AGGREGATOR,
    ORACLE_GET_PRICE_TARGET,
    MUL_FACTOR_TARGET,
    DECIMALS,
    CETUS_BUCK_SUI_POOL,
    CETUS_GLOBAL_CONFIG,
    CETUS_SWAP_TARGET,
    CETUS_ROUTER_SWAP_TARGET,
  } from "./constants.js";

export async function cetusSwapExec() {

  const MARKET_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f",
    mutable: false,
    initialSharedVersion: 1574190
  });

  const ORACLE_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x871d8a227114f375170f149f7e9d45be822dd003eba225e83c05ac80828596bc",
    mutable: true,
    initialSharedVersion: 29297877
  });

  const LAST_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1
  });

  const MERGE_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xdef58fa816b60a4aeff52fcb079ba43c788711666c52e2bf32d1e7bd246d37e7",
    mutable: false,
    initialSharedVersion: 1
  });

  // reference
  // https://suivision.xyz/txblock/2DSvdhFv5o7etWPSbLrAYy6ut2QjXfw5eJChyX7g17mA
  // swap 3 sui to haSui

  // set sender address 
  const address = "0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be"

  // make transaction block
  const tx = new TransactionBlock();
  tx.setSender(address);

  // split coins
  const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

  // target coin makes zero coin
  const zero_coin = tx.moveCall({
    target: "0x2::coin::zero",
    typeArguments: ["0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"],
    arguments: []
  });

  // Router Swap
  // const [buck_coin_out, sui_coin_out] = tx.moveCall({
  //   target: "0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee::router::swap",
  //   typeArguments: ["0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI","0x2::sui::SUI"],
  //   arguments: [
  //     tx.object(MARKET_OBJECT), // bucket oracle
  //     tx.object(ORACLE_OBJECT), // bucket oracle
  //     zero_coin,
  //     coin,
  //     tx.pure(false),
  //     tx.pure(true),
  //     tx.pure(1000000000),
  //     tx.pure(79226673515401279992447579055),
  //     tx.pure(false),
  //     tx.object(LAST_OBJECT)
  //   ],
  // });

    // check_coin_threshold
    // const coin_threshold = tx.moveCall({
    //   target: "0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee::router::check_coin_threshold",
    //   typeArguments: ["0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"],
    //   arguments: [
    //     buck_coin_out, 
    //     tx.pure(969299192), 
    //   ],
    // });
  
    // merge sui to gas
    // tx.mergeCoins(zero_coin, buck_coin_out);
     
    // // check_coin_threshold
    // tx.moveCall({
    //   target: "0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee::utils::transfer_coin_to_sender",
    //   typeArguments: ["0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI"],
    //   arguments: [
    //     buck_coin_out
    //   ],
    // });


    return tx;
    
  }
