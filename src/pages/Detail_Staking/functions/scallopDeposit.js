import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
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

export async function scallopMint() {

    const address = "0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be"

    const tx = new TransactionBlock();
    tx.setSender(address);

    const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
      objectId: "0x07871c4b3c847a0f674510d4978d5cf6f960452795e8ff6f189fd2088a3f6ac7",
      mutable: true,
      initialSharedVersion: 7765848,
    });

    const Detail_Object = Inputs.SharedObjectRef({
      objectId: "0xa757975255146dc9686aa823b7838b507f315d704f428cbadad2f4ea061939d9",
      mutable: true,
      initialSharedVersion: 7765848,
    });

    const Clock_Object = Inputs.SharedObjectRef({
      objectId: "0x0000000000000000000000000000000000000000000000000000000000000006",
      mutable: false,
      initialSharedVersion: 1,
    });

    const Next_Object = Inputs.SharedObjectRef({
      objectId: "0x4f0ba970d3c11db05c8f40c64a15b6a33322db3702d634ced6536960ab6f3ee4",
      mutable: true,
      initialSharedVersion: 21473729,
    });

    const [coin] = tx.splitCoins(tx.gas, [tx.pure(10000000000)]);

  // unwrap sui coin to balance
  const sui_balance = tx.moveCall({
    target: "0x2::coin::into_balance",
    typeArguments: ["0x2::sui::SUI"],
    arguments: [coin],
  });
    
    tx.moveCall({
      target: "0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e::mint::mint",
      typeArguments: ["0x2::sui::SUI"],
      arguments: [
        tx.object(PROTOCOL_OBJECT),
        tx.object(Detail_Object),
        sui_balance,
        tx.object(Clock_Object),
      ],
    });

    // tx.moveCall({
    //   target: "0x7c4fdabe81c31b19a45d1e572a52a539997a90903fbb5bfab71480abe0fa62c3::user::new_spool_account",
    //   typeArguments: ["0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x2::sui::SUI>"],
    //   arguments: [
    //     tx.object(Next_Object),
    //     tx.object(Clock_Object),
    //   ],
    // });


    // tx.moveCall({
    //   target: "0x7c4fdabe81c31b19a45d1e572a52a539997a90903fbb5bfab71480abe0fa62c3::user::stake",
    //   typeArguments: ["0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x2::sui::SUI>"],
    //   arguments: [
    //     tx.object(Next_Object),
    //     tx.object(Clock_Object),
    //   ],
    // });

    tx.transferObjects([coin], tx.pure("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be"));
   
  
    return tx;
    
  }
