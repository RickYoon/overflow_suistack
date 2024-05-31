import { TransactionBlock, Inputs } from "@mysten/sui.js/transactions";
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

export async function FlashloanLeverage() {

    const input_coll = 10;
    const leverage = 3;

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
        
    // update oracle
    tx.moveCall({
        target: SWITCHBOARD_UPDATE_TARGET,
        typeArguments: ["0x2::sui::SUI"],
        arguments: [
        tx.object(ORACLE_OBJECT),
        tx.object(CLOCK_OBJECT),
        tx.object(SWITCHBOARD_SUI_AGGREGATOR),
        ],
    });

    // get sui price from oracle
    const [sui_oracle_price, oracle_precision] = tx.moveCall({
        target: ORACLE_GET_PRICE_TARGET,
        typeArguments: ["0x2::sui::SUI"],
        arguments: [tx.object(ORACLE_OBJECT), tx.object(CLOCK_OBJECT)],
    });
        
    // leverage 3x, init 10 sui
    // calculate buck amount by sui price
    const buck_amount = tx.moveCall({
        target: MUL_FACTOR_TARGET,
        arguments: [
        tx.pure(2 * input_coll * DECIMALS, "u64"),
        sui_oracle_price,
        oracle_precision,
        ],
    });

    // flash borrow buck from tank
    const FLASH_BORROW_BUCK_TARGET =
    `${MAINNET_PACKAGE_ID}::${MODULES.FLASH_BORROW_BUCK}`
    const [buck_balance, flash_receipt] = tx.moveCall({
    target: FLASH_BORROW_BUCK_TARGET,
    typeArguments: ["0x2::sui::SUI"],
    arguments: [tx.object(PROTOCOL_OBJECT), buck_amount],
    });

    // repay flashloan
    const REPAY_FLASH_BORROW_TARGET =
    `${MAINNET_PACKAGE_ID}::${MODULES.FLASH_REPAY_BUCK}`
    tx.moveCall({
    target: REPAY_FLASH_BORROW_TARGET,
    typeArguments: ["0x2::sui::SUI"],
    arguments: [tx.object(PROTOCOL_OBJECT), buck_balance, flash_receipt],
    });

    // // get buck balance value
    // const buck_balance_value = tx.moveCall({
    // target: "0x2::balance::value",
    // typeArguments: [BUCK_TYPE],
    // arguments: [buck_balance],
    // });

    // // warp balance to coin
    // const buck_coin = tx.moveCall({
    // target: "0x2::coin::from_balance",
    // typeArguments: [BUCK_TYPE],
    // arguments: [buck_balance],
    // });

    // // create zero balance coin
    // const zero_coin = tx.moveCall({
    // target: "0x2::coin::zero",
    // typeArguments: ["0x2::sui::SUI"],
    // arguments: [],
    // });
    
    return tx
    
    
  }
