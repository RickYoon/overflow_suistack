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

export async function BuckPosition(address, amount) {

  // reference tranactions
  // https://suivision.xyz/txblock/Cm2V8crFesPS3f2jvVXjrGD946KqHHk29TouXPiJc7Yt

  const SWITCHBOARD_UPDATE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_switchboard";
  const SWITCHBOARD_SUI_AGGREGATOR = "0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594";
  const ORACLE_GET_PRICE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::get_price";
  // const MUL_FACTOR_TARGET = "0x00db9a10bb9536ab367b7d1ffa404c1d6c55f009076df1139dc108dd86608bbe::math::mul_factor";
  
  // 신기한게 업데이트 안하고 바로 부르면 에러가 발생함.
  // const input_coll = 10;
  // const leverage = 3;
  
  // 트렌젝션 만들기
  const tx = new TransactionBlock();
  tx.setSender(address);
  
  const ORACLE_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0xf578d73f54b3068166d73c1a1edd5a105ce82f97f5a8ea1ac17d53e0132a1078",
    mutable: true,
    initialSharedVersion: 5174506,
  });
  
  const CLOCK_OBJECT = Inputs.SharedObjectRef({
    objectId:
      "0x0000000000000000000000000000000000000000000000000000000000000006",
    mutable: false,
    initialSharedVersion: 1,
  });
  
  // 오라클 업데이트
  tx.moveCall({
    target: SWITCHBOARD_UPDATE_TARGET,
    typeArguments: ["0x2::sui::SUI"],
    arguments: [
      tx.object(ORACLE_OBJECT), // bucket oracle
      tx.object(CLOCK_OBJECT), // clock
      tx.object(SWITCHBOARD_SUI_AGGREGATOR), // sui / usd
    ],
  });

  // 업데이트 된 오라클에서 Sui 가격 가져오기
  tx.moveCall({
    target: ORACLE_GET_PRICE_TARGET,
    typeArguments: ["0x2::sui::SUI"],
    arguments: [tx.object(ORACLE_OBJECT), tx.object(CLOCK_OBJECT)],
  });

  // 인출할 코인 split 하기
  const [coin] = tx.splitCoins(tx.gas, [tx.pure(amount * 1000000000)]);

  // unwrap sui coin to balance
  const sui_balance = tx.moveCall({
    target: "0x2::coin::into_balance",
    typeArguments: ["0x2::sui::SUI"],
    arguments: [coin],
  });

  // open position: borrow
  const BORROW_TARGET = `${MAINNET_PACKAGE_ID}::${MODULES.BORROW}`;
  const buck_output_balance = tx.moveCall({
      target: BORROW_TARGET,
      typeArguments: ["0x2::sui::SUI"],
      arguments: [
        tx.object(PROTOCOL_OBJECT),
        tx.object(ORACLE_OBJECT),
        tx.object(CLOCK_OBJECT),
        sui_balance,
        tx.pure((amount * 1000000000)/2),
        tx.pure(["0x659aec5cf141b88f3eeed1aa5ea1398688be93d5b62d548837c7a51443a7b0d4"]),
      ]
    });

    // unwrap sui coin to balance
    const buck_res = tx.moveCall({
      target: "0x2::coin::from_balance",
      typeArguments: ["0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK"],
      arguments: [buck_output_balance],
    });

    tx.transferObjects([buck_res], tx.pure(address));
   
    return tx;
    
  }
