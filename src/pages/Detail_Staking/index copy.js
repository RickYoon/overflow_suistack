import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";

import {walletConnectModalOpen} from 'redux/reducers/WalletActions'
import {kaikasKlayDepositExecutor} from "./kaikasExecutor"
import {metamaskDepositExecutor} from './metamaskExecutor.js';
import WalletManageBox from "./components/WalletManageBox"

import poolInfos from "./poolInfos.json"
import { SDK } from './InitMainetSdk.ts'
import { ConnectButton,useWallet, addressEllipsis } from "@suiet/wallet-kit";
import { TransactionBlock,Inputs } from "@mysten/sui.js/transactions";
// import { Inputs } from "@mysten/sui.js/inputs";

import "@suiet/wallet-kit/style.css"; // don't forget to import default stylesheet



function DetailStaking() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const wallet = useWallet(); 

  const [depositmodal, setDepositmodal]= useState(false)
  const [amount, setAmount]= useState()
  const [maxAmount, setMaxAmount]= useState(0)

  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false)
  const [detailData, setDetailData] = useState({
    "poolName": "Swapscanner",
    "category": "노드 스테이킹",
    "contractAddress": "0xf50782a24afcb26acb85d086cf892bfffb5731b5",
    "investedToken": 0,
    "investedUSD": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlUSD": 0,
    "tvlKRW": 0,
    "apr": 0
})


// 월렛연결 모달 열기
const openModal = () => {
    dispatch(walletConnectModalOpen())
}

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더
  const walletConnectModal = useSelector(state => state.walletConnect) // 지갑 연결 모달 상태
  
  useEffect(() => {

    test()

    // updateAsset()

    // const singer = new RawSigner("091d33f86c16f57c0242b9f2459eecd510d27145b9586b3626c603fde0afb15f");
    // const kriyaSpot = new Spot(signer);


  }, [])

  useEffect(() => {

    // updateAsset()


  }, [])

  async function updateAsset () {


    if(userAccount === ""){

      const assetList = await axios.get(`https://nyzomcdsf8.execute-api.ap-northeast-2.amazonaws.com/production/linkryptopoolinfos`)
      console.log("assetList",assetList.data.body.klayStakingPool)

      setDetailData({
        "poolName": poolInfos[id].poolName,
        "category": poolInfos[id].poolType,
        "investedToken": 0,
        "investedUSD":0,
        "availableToken": 0,
        "tvlToken": assetList.data.body.klayStakingPool[poolInfos[id].poolName].klayAmount,
        "tvlUSD": assetList.data.body.klayStakingPool[poolInfos[id].poolName].klayTVL,
        "tvlKRW": 0,
        "apr": 0
    })

    } else {

      const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/managePool?userAddr=${userAccount}&contractAddress=${id}`)
      console.log("assetList",assetList.data)
      setDetailData(assetList.data)
      setMaxAmount(assetList.data.availableToken)

    }


  }

  async function depositExecute() {

    if(walletProvider==="kaikas"){
      await kaikasKlayDepositExecutor(userAccount,id,amount)
    } else {
      await metamaskDepositExecutor(userAccount,id,amount)
    }

    // console.log("trxReturn", trxReturn)
    const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/managePool?userAddr=${userAccount}&contractAddress=${id}`)
    console.log("assetList",assetList.data)
    setDetailData(assetList.data)
    setMaxAmount(assetList.data.availableToken)
    setDepositmodal(false)

    
  }

  const goProtocol = () => {

      const stakingUrl = poolInfos[id].linkUrl;
      window.open(stakingUrl, '_blank');

    }





  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      돌아가기
      </button>
    )
  }

  function formatNumber(number) {

    const formattedNumber = Number(number).toFixed(2);
    const numberWithCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return numberWithCommas;

  }

  async function test() {

    const pool = await SDK.Pool.getPool('0x8b573503147df7fb650cb5e3db76d97ebb3e9c893501af8543fabe80f7bf7d07')
    console.log({ pool })


    // const poolId = '0x83c101a55563b037f4cd25e5b326b26ae6537dc8048004c1408079f7578dd160'
    // const pool = await TestnetSDK.Pool.getPool(poolId)
    // const res = await TestnetSDK.Pool.fetchPositionRewardList({
    //   pool_id: pool.poolAddress,
    //   coinTypeA: pool.coinTypeA,
    //   coinTypeB: pool.coinTypeB,
    // })
    // console.log('fetch reward list of one pool', res)
  }

  // function createMintNftTxnBlock() {
  //   // define a programmable transaction block
  //   const txb = new TransactionBlock();
  
  //   // note that this is a devnet contract address
  //   const contractAddress =
  //     "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f";
  //   const contractModule = "nft";
  //   const contractMethod = "mint";
  
  //   const nftName = "Suiet NFT";
  //   const nftDescription = "Hello, Suiet NFT";
  //   const nftImgUrl =
  //     "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4";
  
  //   txb.moveCall({
  //     target: `${contractAddress}::${contractModule}::${contractMethod}`,
  //     arguments: [
  //       txb.pure(nftName),
  //       txb.pure(nftDescription),
  //       txb.pure(nftImgUrl),
  //     ],
  //   });
  
  //   return txb;
  // }

  async function cetusSwap() {

    let count = await axios.get('https://api-sui.cetus.zone/v2/sui/swap/count');

    const pool = count.data.data.pools.find((pool) => {
      return pool.symbol == 'xAIFRENS-SUI';
    });
    console.log("pool: ", pool);

  //  let poolObj = await Inputs.SharedObjectRef({
  //     id : pool.swap_account,
  //     options: {
  //         showContent : true,
  //         showType : true
  //     }
  //   });

    const globalConfig = '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f';

    const txb = new TransactionBlock();

    // const vec = txb.makeMoveVec({
    //   objects: aifrensObjs.map((obj) => txb.object(obj.coinObjectId)),
    // });

    const CETUS_ROUTER_SWAP_TARGET = "0x886b3ff4623c7a9d101e0470012e0612621fbc67fa4cedddd3b17b273e35a50e::pool_script::swap_a2b";
    const CETUS_GLOBAL_CONFIG = "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f"
    const CETUS_BUCK_SUI_POOL = "0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0"
    const BUCK_TYPE = "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::buck";

    const buck_coin = await txb.moveCall({
      target: "0x2::coin::from_balance",
      typeArguments: [BUCK_TYPE],
      arguments: [0],
    });

    let b = await txb.moveCall({
          target: CETUS_ROUTER_SWAP_TARGET,
          typeArguments: [BUCK_TYPE, "0x2::sui::SUI"],
          arguments: [
            txb.object(CETUS_GLOBAL_CONFIG),
            txb.object(CETUS_BUCK_SUI_POOL),
            buck_coin,
            txb.pure(true),              // fixed or not? i don't known
            txb.pure(0),    // amount
            txb.pure(0),  // amount_limit
            txb.pure(4295048016),        // getDefaultSqrtPriceLimit, hardcode
            txb.pure('0x6'),             // clock
        ],
        typeArguments: ['0x9fe1780ac27ec50c9c441fb31822f5c148f841f09ee455c6a0daf7c634a30a27::aifrens::AIFRENS', '0x2::sui::SUI']
      });

    return b
    
  }

  async function leverageFarming() {

    const MUL_FACTOR_TARGET = "0x00db9a10bb9536ab367b7d1ffa404c1d6c55f009076df1139dc108dd86608bbe::math::mul_factor";
    const ORACLE_GET_PRICE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::get_price";
    const DECIMALS = 10 ** 9;

    const txb = new TransactionBlock();
    txb.setSender("0x08e9db0c6046640881640455408285a6729686ab5fe4e5c47d7938b8607e615f");

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

    const SWITCHBOARD_UPDATE_TARGET = "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_switchboard";
    const SWITCHBOARD_SUI_AGGREGATOR = "0xbca474133638352ba83ccf7b5c931d50f764b09550e16612c9f70f1e21f3f594";

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


    console.log("sui_oracle_price",sui_oracle_price)
    console.log("oracle_precision",oracle_precision)
    console.log("buck_amount",buck_amount)
    
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

  async function trxExecute() {

    if (!wallet.connected) return;
    // const txb = await leverageFarming();
    const txb = await cetusSwap();

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

  return (
    <>
      <div class="bg-gray-50 h-screen">
        <div class="p-4">
          <OverBox>
              <SubTemplateBlockVertical>
              <WalletManageBox title={poolInfos[id].poolName}/>
              <div>
              <div class="bg-white p-3 border border-gray-100 rounded-lg mb-5">

              <table class="w-full">
            <thead class="">
            </thead>
                <tbody class="bg-white">
                    <tr>
                    <td className="pl-5">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Staking Amount</div>
                                </p>
                                {formatNumber(detailData.investedToken)}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>Staking Value</div>
                                </p>
                                $ {formatNumber(detailData.investedUSD)}
                                {/* $ {positionData.totalStats.totalDebtUSD.toFixed(2)} */}
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>
                    <td className="p-4">
                        <Th>
                        <PoolinfoBox>                                    
                            <Explainbox>
                                <p class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70 text-left">
                                <div>APR</div>
                                </p>
                                {formatNumber(detailData.apr)} %
                            </Explainbox>
                        </PoolinfoBox>
                        </Th>
                    </td>

                    </tr>
                </tbody>
               
            </table>
            </div>


            <div class="flex flex-row">

            <div class="basis-3/5 border border-gray-100 m-1 pt-5 pb-5 bg-white block rounded-lg dark:hover:bg-gray-700 mr-5">

            <h5 style={{marginLeft:"30px"}} class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white">Overview</h5>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Name</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {poolInfos[id].poolName}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Type</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {poolInfos[id].poolType}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Total</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$ {formatNumber(detailData.tvlUSD/1000000)} M</dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {formatNumber(detailData.tvlToken)} KLAY</dd>
                </div>
                <div class="pt-5 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt style={{marginLeft:"50px"}} class="text-sm font-medium leading-6 text-gray-900">Infos</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Company : {poolInfos[id].info.operation}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Started : {poolInfos[id].info.startDate}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Accident : {poolInfos[id].info.hackingHistory}
                  </dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0"></dd>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Audit : {poolInfos[id].info.auditPerformed}
                  </dd>
                </div>
              </dl>
            </div>
            </div>


            <div className="basis-2/5 bg-white border border-gray-100 m-1 p-5 rounded-lg" style={{height:"280px"}}>
              Manage
              <div style={{marginTop:"30px"}}></div>
              {userAccount === "" ?
              <>
              <ConnectButton />
              {/* <span class="gradient">Wallet status:</span> {wallet.status}
              <p>Connected Account: {(wallet.account.address)}</p>
              <p>Connected Account: {addressEllipsis(wallet.account.address)}</p>
              <span class="gradient">Current chain of wallet: </span>
              {wallet.chain.name} */}

                <button onClick={trxExecute} class="mt-5 inline-block w-full p-3 text-blue-600 bg-blue-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Transaction Execution
                </button> 
              </>
              :
              poolInfos[id].manage.connected ? 
              <>
              <button onClick={()=>setDepositmodal(true)} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Deposit
              </button>
              <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Withdrawal
              </button>
              <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Go to protocol
                </button>    
              {/* <button class="mt-5 inline-block w-full p-3 hover:text-blue-600 hover:bg-blue-100 text-gray-600 bg-gray-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                Swap
              </button> */}
              </>
              :
              <>
                <button onClick={goProtocol} class="mt-5 inline-block w-full p-3 text-blue-600 bg-blue-100 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Go to protocol
                </button>    
              </>
              }
              

                  {/* <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        예치
                      </a>
                  </li>
                  <li class="w-full">
                      <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        인출
                      </a>
                  </li>
                  
              </ul> */}


                
                  {/* <h5 class="mb-2 text-1xl font-medium tracking-tight text-black dark:text-white"></h5>
                  <div style={{marginTop:"30px"}}></div>
          <div class="items-center">   
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <input type="text" id="voice-search" class="bg-white border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="예치가능 : 20.00 KLAY" required 
                  />
              </div>              
          </div>

          <div style={{marginTop:"30px"}}></div>

          <div style={{textAlign:"right"}}>
            <button onClick={requestDeposit} style={{width:"100%"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span style={{width:"30px"}}>예치하기</span>
            </button>
          </div> */}
                        </div>
              

              </div>



              


          
          </div>
          {/* <button onClick={test}> abc </button> */}
          {/* <div style={{marginTop:"30px"}}></div> */}
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
      {depositmodal ? (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-md max-h-full">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                       Deposit
                    </h3>
                    <button onClick={() => setDepositmodal(false)}>
                        <span className="bg-transparent text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    
                    <div class="p-6">
                    
                    {/* <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Insert Deposit Amount</p> */}
                        <ul class="my-4 space-y-3">
                            <li>
                                <a href="#" class="flex items-center p-3 text-base font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  Klay Balance : 
                                  <span class="flex-1 ml-3 whitespace-nowrap" >{maxAmount}</span>
                                </a>
                            </li>
                        </ul>
                    <div class="mt-3"></div>

                        {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">0x123...</label> */}
                        <div class="relative">
                            {/* <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div> */}
                            <input onChange={(e)=>setAmount(e.target.value)} value={amount} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insert Deposit Number" />
                            <button onClick={()=>setAmount(maxAmount)} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>

                        <div class="mt-10"></div>
                        <button class="w-full items-center p-3 text-white font-bold text-gray-900 rounded-lg bg-primary-500 hover:bg-primary-700 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <div style={{textAlign:"center"}} onClick={depositExecute}>Execution</div>
                        </button>                    
                        
                    </div>
                    
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}

    </>
  );
}

const OverBox = styled.div`

  /* position: relative;
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow: auto;
  padding: 30px; */

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`



const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
     margin: 10px auto;
    max-width: 800px;
    /* padding-bottom: 10px; */
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255); */
    /* background-clip: border-box; */
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
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



const Explainbox = styled.div`
  display : flex;
  flex-direction : column;
`

const PoolinfoBox = styled.div`
  text-align: left;
  display : flex;
  flex-direction : row;
  align-items: center;
`

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;


export default DetailStaking;

