import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";

export async function oracleUpdate() {

  const SWITCHBOARD_UPDATE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_switchboard";
  const SWITCHBOARD_SUI_AGGREGATOR = "0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594";
  const ORACLE_GET_PRICE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::get_price";
  // const MUL_FACTOR_TARGET = "0x00db9a10bb9536ab367b7d1ffa404c1d6c55f009076df1139dc108dd86608bbe::math::mul_factor";
  
  // 신기한게 업데이트 안하고 바로 부르면 에러가 발생함.
  // const input_coll = 10;
  // const leverage = 3;
  
  // 트렌젝션 만들기
  const tx = new TransactionBlock();
  
  tx.setSender("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be");
  
  
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
  
  // // 업데이트 된 오라클에서 Sui 가격 가져오기
  // const [sui_oracle_price, oracle_precision] = tx.moveCall({
  //   target: ORACLE_GET_PRICE_TARGET,
  //   typeArguments: ["0x2::sui::SUI"],
  //   arguments: [tx.object(ORACLE_OBJECT), tx.object(CLOCK_OBJECT)],
  // });
  
  return tx
  
  
  }
  