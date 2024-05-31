import 'App.css'; 
import styled, { keyframes } from 'styled-components';
import { useWallet } from "@suiet/wallet-kit";

import {cetusSwapExec} from "./functions/cetusSwapExec.js"
import {oracleUpdate} from "./functions/updateOracle.js"
// import {scallopMint} from "./functions/scallopDeposit.js"
import {BuckPosition} from "./functions/makeBuckPosition.js"
import {DepositSui} from "./functions/depositSui.js"
import {LendToSuilend} from "./functions/suilend/lendToSuilend.js"
import {LendSuiNavi} from "./functions/navi/lendSui.js"
import {FlashloanLeverage} from "./functions/buck/FlashLeverage.js"

import "@suiet/wallet-kit/style.css";
import Swal from 'sweetalert2'

function DetailStaking() {

  const wallet = useWallet(); 

  async function handleCetusSwap() {

    if (!wallet.connected) return;
    // const txb = await leverageFarming();
    const txb = await cetusSwapExec();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("transaction success!", res);
      alert("Congrats! ");
    } catch (e) {
      alert("Oops!! ");
      console.error("transaction failed", e);
    }

  }

  async function handleUpdateOracle() {

    if (!wallet.connected) return;
    // const txb = await leverageFarming();
    const txb = await oracleUpdate();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("transaction success!", res);
      alert("Congrats! ");
    } catch (e) {
      alert("Oops!! ");
      console.error("transaction failed", e);
    }
  }

  // async function handleScallop() {

  //   if (!wallet.connected) return;
  //   // const txb = await leverageFarming();
  //   const txb = await scallopMint();

  //   try {
  //     // call the wallet to sign and execute the transaction
  //     const res = await wallet.signAndExecuteTransactionBlock({
  //       transactionBlock: txb,
  //     });
  //     console.log("transaction success!", res);
  //     alert("Congrats! ");
  //   } catch (e) {
  //     alert("Oops!! ");
  //     console.error("transaction failed", e);
  //   }
  // }


  async function handleBuck() {

    if (!wallet.connected) return;
    const txb = await BuckPosition();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("transaction success!", res.digest);
      // alert("Congrats! ");
    } catch (e) {
      // alert("Oops!! ");
      console.error("transaction failed", e);
    }
  }

  // DepositSui

  async function handleLendSui() {

    if (!wallet.connected) return;
    const txb = await DepositSui();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
  
      console.log("transaction success!", res);

      Swal.fire({
        title: "Success!",
        html: `
              <b>Check the transaction</b> ->
              <a href="https://suivision.xyz/txblock/${res.digest}" target="_blank">Link</a> 
           `
      });

    } catch (e) {
      alert("Oops!! ");
      console.error("transaction failed", e);
    }
  }

  async function handleNaviSui() {

    if (!wallet.connected) return;
    const txb = await LendSuiNavi();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("transaction success!", res);
      alert("Congrats! ");
    } catch (e) {
      alert("Oops!! ");
      console.error("transaction failed", e);
    }
  }

  async function makebuck() {

    if (!wallet.connected) return;
    const txb = await BuckPosition();

    try {
      // call the wallet to sign and execute the transaction
      const res = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
      });
      console.log("transaction success!", res);
      alert("Congrats! ");
    } catch (e) {
      alert("Oops!! ");
      console.error("transaction failed", e);
    }
  }

  

  

  // handleScallop


  return (
    <>
      <div class="bg-gray-50 h-screen">
        <div class="p-4">
          <OverBox>
            <SubTemplateBlockVertical>
              <div className="md:flex md:justify-center md:items-center pt-5">
                  <div className="flex flex-row" style={{fontSize:"40px"}}>
                      <div>Quick Order</div>
                  </div>                
              </div>

              <div className="md:flex md:justify-center md:items-center">
                  <div className="flex flex-row" style={{fontSize:"20px"}}>
                      <div className="text-gray-500">We provide programed transactions for you</div>
                  </div>                
              </div>


              <div className="md:flex md:justify-center md:items-center mt-10">
                  <div className="flex flex-row" style={{fontSize:"20px"}}>
                      <div>Select asset and amount</div>                    
                  </div>
              </div>

              <div className="w-40 m-auto md:flex md:justify-center md:items-center mt-3 border border-blue-300 bg-blue-100 inline-block p-2 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                <div className="flex" style={{ fontSize: "20px" }}>
                    <img src="https://sui-overflow.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F518905b0a55146d3b97fc2a070cf7ecd%2Fassets%2Ffavicon%2F770.png&w=1440&q=75" alt="Sui Coin" className="w-8 h-8 mr-2 rounded-full flex-shrink-0" />
                    <div>
                        Sui
                    </div>
                </div>
              </div>
                
              <div class="w-80 m-auto relative pt-5">
                  <input type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                  <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
              </div>             

              <div className="md:flex md:justify-center md:items-center mt-10">
                  <div className="flex flex-row" style={{fontSize:"20px"}}>
                      <div>Select Single Finance</div>
                  </div>                
              </div>

              <div class="flex space-x-5 mt-0 p-3">
                <button onClick={handleLendSui} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Lend to Scallop <br/>
                  Apr : 14.22%
                </button> 
                <button onClick={handleNaviSui} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Lend to Navi <br/>
                  Apr : 22.12%
                </button> 
                <button onClick={LendToSuilend} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Lend to Suilend <br/>
                  Apr : 13.39%
                </button>
              </div>

              <div class="flex space-x-5 mt-0 p-3">
                <button onClick={handleBuck} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Lend and Borrow Buck <br />
                  APR : - 4.5 % (fixed)
                </button> 
                <button onClick={handleBuck} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Borrow USDC <br />
                  APR : + 11.5 %
                </button> 

                <button class="inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active hover:bg-gray-100 hover:border-blue-300 border border-red ">
                  add more +<br />
                </button> 

              </div>

              <div className="md:flex md:justify-center md:items-center mt-10">
                  <div className="flex flex-row" style={{fontSize:"20px"}}>
                      <div>Select Blended Finance</div>
                  </div>                
              </div>

              <div class="flex space-x-5 mt-0 p-3">
                <button onClick={handleLendSui} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Leverage Farming <br/>
                  Apr : 14.22%
                </button> 
                <button class="inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active hover:bg-gray-100 hover:border-blue-300 border border-red ">
                  -<br />
                </button> 
                <button class="inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active hover:bg-gray-100 hover:border-blue-300 border border-red ">
                  -<br />
                </button> 

              </div>

            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
    </>
  );
}

const OverBox = styled.div`

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`

const SubTemplateBlockVertical = styled.div`
    margin: 10px auto;
    max-width: 800px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;    
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;

export default DetailStaking;



/* 
// // leverage 3x, init 10 sui
// // calculate buck amount by sui price
// const buck_amount = tx.moveCall({
//   target: MUL_FACTOR_TARGET,
//   arguments: [
//     tx.pure(2 * 3 * 5, "u64"),
//     sui_oracle_price,
//     oracle_precision,
//   ],
// });

// console.log("buck_amount",buck_amount)

// const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
//   objectId: "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df",
//   mutable: true,
//   initialSharedVersion: 6365975,
// });

// // flash borrow buck from tank
// const FLASH_BORROW_BUCK_TARGET = "0x8e39c5069076cbb95bede1e5d2217c91f7fdc3ee266d778927f128e561c6f3eb::buck::flash_borrow_buck"
// const [buck_balance, flash_receipt] = tx.moveCall({
//   target: FLASH_BORROW_BUCK_TARGET,
//   typeArguments: ["0x2::sui::SUI"],
//   arguments: [tx.object(PROTOCOL_OBJECT), buck_amount],
// });

// console.log("flash_receipt",flash_receipt)

//   // repay flashloan
// const REPAY_FLASH_BORROW_TARGET = "0x8e39c5069076cbb95bede1e5d2217c91f7fdc3ee266d778927f128e561c6f3eb::buck::flash_repay_buck"
// tx.moveCall({
//   target: REPAY_FLASH_BORROW_TARGET,
//   typeArguments: ["0x2::sui::SUI"],
//   arguments: [tx.object(PROTOCOL_OBJECT), buck_balance, flash_receipt],
// });

async function swapSui(){

const txb = new TransactionBlock();
txb.setSender("0x08e9db0c6046640881640455408285a6729686ab5fe4e5c47d7938b8607e615f");




return txb;    
}


async function leverageFarmingTxb() {

const DECIMALS = 10 ** 9;
const MUL_FACTOR_TARGET = "0x00db9a10bb9536ab367b7d1ffa404c1d6c55f009076df1139dc108dd86608bbe::math::mul_factor";
const ORACLE_GET_PRICE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::get_price";
const SWITCHBOARD_UPDATE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_switchboard";
const SWITCHBOARD_SUI_AGGREGATOR = "0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594";

  // 신기한게 업데이트 안하고 바로 부르면 에러가 발생함.
  const input_coll = 10;
  const leverage = 3;


const txb = new TransactionBlock();

txb.setSender("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be");

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
await txb.moveCall({
  target: SWITCHBOARD_UPDATE_TARGET,
  typeArguments: ["0x2::sui::SUI"],
  arguments: [
    txb.object(ORACLE_OBJECT),
    txb.object(CLOCK_OBJECT),
    txb.object(SWITCHBOARD_SUI_AGGREGATOR),
  ],
});

// get sui price from oracle
const [sui_oracle_price, oracle_precision] = await txb.moveCall({
  target: ORACLE_GET_PRICE_TARGET,
  typeArguments: ["0x2::sui::SUI"],
  arguments: [txb.object(ORACLE_OBJECT), txb.object(CLOCK_OBJECT)],
});

// leverage 3x, init 10 sui
// calculate buck amount by sui price
const buck_amount = await txb.moveCall({
  target: MUL_FACTOR_TARGET,
  arguments: [
    txb.pure(2 * 10 * DECIMALS, "u64"),
    sui_oracle_price,
    oracle_precision,
  ],
});


// console.log("sui_oracle_price",sui_oracle_price)
// console.log("oracle_precision",oracle_precision)
// console.log("buck_amount",buck_amount)

// define a programmable transaction block

const MAINNET_PROTOCOL_ID = "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df";

const PROTOCOL_OBJECT = Inputs.SharedObjectRef({
  objectId: MAINNET_PROTOCOL_ID,
  mutable: true,
  initialSharedVersion: 6365975,
});


// flash borrow buck from tank
const [buck_balance, flash_receipt] = txb.moveCall({
    target: "0x8e39c5069076cbb95bede1e5d2217c91f7fdc3ee266d778927f128e561c6f3eb::buck::flash_borrow_buck",
    typeArguments: ["0x2::sui::SUI"],
    arguments: [txb.object(PROTOCOL_OBJECT), buck_amount],
});

const BUCK_TYPE = "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::buck";

// get buck balance value
const buck_balance_value = txb.moveCall({
  target: "0x2::balance::value",
  typeArguments: [BUCK_TYPE],
  arguments: [buck_balance],
});

// warp balance to coin
const buck_coin = txb.moveCall({
  target: "0x2::coin::from_balance",
  typeArguments: [BUCK_TYPE],
  arguments: [buck_balance],
});

console.log("buck_balance",buck_balance)

// create zero balance coin
const zero_coin = txb.moveCall({
  target: "0x2::coin::zero",
  typeArguments: ["0x2::sui::SUI"],
  arguments: [],
});

const CETUS_ROUTER_SWAP_TARGET = "0x886b3ff4623c7a9d101e0470012e0612621fbc67fa4cedddd3b17b273e35a50e::pool_script::swap_a2b";
const CETUS_GLOBAL_CONFIG = "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f"
const CETUS_BUCK_SUI_POOL = "0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0"

// swap buck to sui
const [buck_coin_out, sui_coin_out] = txb.moveCall({
  target: CETUS_ROUTER_SWAP_TARGET,
  typeArguments: [BUCK_TYPE, "0x2::sui::SUI"],
  arguments: [
    txb.object(CETUS_GLOBAL_CONFIG),
    txb.object(CETUS_BUCK_SUI_POOL),
    buck_coin,
    zero_coin,
    txb.pure(true),
    txb.pure(true),
    buck_balance_value,
    txb.pure(0),
    txb.pure(4295048016),
    txb.object("0x6"),
  ],
});

// destory zero coin
txb.moveCall({
target: "0x2::coin::destroy_zero",
typeArguments: [BUCK_TYPE],
arguments: [buck_coin_out],
});

// merge sui to gas
txb.mergeCoins(txb.gas, [sui_coin_out]);

const [sui_coin] = txb.splitCoins(txb.gas, [
txb.pure(leverage * input_coll * DECIMALS),
]);
// unwrap sui coin to balance
const sui_balance = txb.moveCall({
target: "0x2::coin::into_balance",
typeArguments: ["0x2::sui::SUI"],
arguments: [sui_coin],
});

// calculate buck borrow amount
const borrow_buck_amount = txb.moveCall({
target: MUL_FACTOR_TARGET,
arguments: [
  txb.pure(Math.floor((leverage * input_coll * DECIMALS) / 1.2), "u64"),
  sui_oracle_price,
  oracle_precision,
],
});

// open position: borrow
const BORROW_TARGET = "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df::buck::borrow"
const buck_output_balance = txb.moveCall({
target: BORROW_TARGET,
typeArguments: ["0x2::sui::SUI"],
arguments: [
  txb.object(PROTOCOL_OBJECT),
  txb.object(ORACLE_OBJECT),
  txb.object(CLOCK_OBJECT),
  sui_balance,
  borrow_buck_amount,
  txb.pure([]),
],
});

// repay flashloan
const REPAY_FLASH_BORROW_TARGET = "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df::buck::flash_repay_buck"
txb.moveCall({
target: REPAY_FLASH_BORROW_TARGET,
typeArguments: ["0x2::sui::SUI"],
arguments: [txb.object(PROTOCOL_OBJECT), buck_output_balance, flash_receipt],
});



return txb;
}

// function sendSui() {

//   // define a programmable transaction block
//   const txb = new TransactionBlock(); // 트랜젝션 블럭 생성 시작

//   // txb.split
//   const [coin] = txb.splitCoins(txb.gas, [txb.pure(987000000)]);
//   txb.transferObjects([coin], txb.pure("0xa59fc5ed0e38f03995262b73916126592d240736ddf6f82c1901ea1d08b566be"));
  
//   return txb;
// }





async function leverageFarming() {

if (!wallet.connected) return;
// const txb = await oracleStudy();
const txb = await leverageFarmingTxb();
// const txb = await swapSui();

try {
  // call the wallet to sign and execute the transaction
  const res = await wallet.signAndExecuteTransactionBlock({
    transactionBlock: txb,
  });
  console.log("transaction success!", res);
  alert("Congrats! ");
} catch (e) {
  alert("Oops!! ");
  console.error("transaction failed", e);
}
} */