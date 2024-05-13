import 'App.css'; 
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import {metamaskDepositExecutor, metamaskWithdrawalExecutor, metamaskSwapExecutor} from './metamaskExecutor.js';
import {kaikasKlayDepositExecutor} from './kaikasExecutor.js';
import icons from "assets/protocols"
import Swal from 'sweetalert2'
import poolInfos from "./poolInfos.json"
import Web3 from 'web3';
import {walletConnectModalOpen} from 'redux/reducers/WalletActions'

import { MetaMaskWalletProvider, initializeSdk, initializeWalletSdk, NetworkNames, EnvNames } from '@kanalabs/kana-wallet-sdk'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3Auth } from "@web3auth/modal";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";

import { MetamaskAdapter } from "@web3auth/metamask-adapter";


function Detail() {

  const { id } = useParams();  
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [chainMatch, setChainMatch] = useState(false);
  const [selection, setSelection] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState(NaN)
  const [withdrawalAmount, setWithdrawalAmount] = useState(NaN)

  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider) // 프로바이더

  const [detailAsset, setDetailAsset] = useState({
    "poolName": "",
    "category": "",
    "contractAddress": "",
    // "TokenName": 0,
    "investedToken": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlKRW": 0,
    "apr": 0
  })


  useEffect(() => {      // await loadAsset()

    loadAsset()
    checkChainNumber()

  }, [userAccount])

  const web3Balance = async () => {
    // const walletProvider = await MetaMaskWalletProvider.connect();
    // const sdk = await initializeWalletSdk(walletProvider, NetworkNames.Mainnet)
    // const sdk = await initializeWalletSdk(provider, undefined,{sessionStorage: sesstionStorage,
    //   omitWalletProviderNetworkcheck: true})
    // const currentSdkInstance = sdk.setCurrentInstance(NetworkNames.Mainnet);
    // const matic_balance = await currentSdkInstance.getAccountBalances();
    // console.log('matic_balance',matic_balance)
    // console.log("sdk.accountAddress", sdk) //smart wallet address
    // const tokenList = await sdk.getTokenList("tokenListTokens",NetworkNames.Mainnet)
    // console.log("tokenList",tokenList)

    // const batch = await sdk.walletTransactions().addToBundle({
    //   to: '0x0fd7508903376dab743a02743cadfdc2d92fceb8', // Destination Ethereum address
    //   value: 100, // This value is in wei
    //   data: null // Optional contract data payload
    // })

    // const estimate = await sdk.walletTransactions().estimate();    
    // console.log('Gas estimated at:', estimate);
  }

  // const setSession = async() => {
  //     if(walletAddress){
  //     setItem(`session-$(walletAddress}`,JSON.stringify(session));
  //     }
  // }


  const web3Login = async () => {

    // const web3auth = new Web3Auth({
    //   clientId: "BODWZ6bS1HF4cxbj98vCyrqGNZbx2xh9tO4PC9kq7pV7p6mEkLWmA5VzCYYtt5okZ_5_xUzgbE26r1rhD9j_xLs", // Get your Client ID from Web3Auth Dashboard
    //   chainConfig: {
    //     chainNamespace: "eip155",
    //     chainId: "0x1", // Please use 0x5 for Goerli Testnet
    //     rpcTarget: "https://rpc.ankr.com/eth",
    //   },
    // });

    const web3auth = new Web3Auth({
      clientId: "BODWZ6bS1HF4cxbj98vCyrqGNZbx2xh9tO4PC9kq7pV7p6mEkLWmA5VzCYYtt5okZ_5_xUzgbE26r1rhD9j_xLs",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      },
      uiConfig: {
        appName: "W3A",
        appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
        theme: "light",
        loginMethodsOrder: ["apple", "google", "twitter"],
        defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
        loginGridCol: 3,
        primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
      },
      web3AuthNetwork: "cyan",
    });

    const openloginAdapter = new OpenloginAdapter({
      loginSettings: {
        mfaLevel: "optional",
      },
      adapterSettings: {
        uxMode: "popup", // "redirect" | "popup"
        whiteLabel: {
          name: "Your app Name",
          logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
          logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
          defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
          dark: false, // whether to enable dark mode. defaultValue: false
        },
        mfaSettings: {
          deviceShareFactor: {
            enable: true,
            priority: 1,
            mandatory: true,
          },
          backUpShareFactor: {
            enable: true,
            priority: 2,
            mandatory: false,
          },
          socialBackupFactor: {
            enable: true,
            priority: 3,
            mandatory: false,
          },
          passwordFactor: {
            enable: true,
            priority: 4,
            mandatory: false,
          },
        },
      },
    });
    web3auth.configureAdapter(openloginAdapter);

    const defaultWcSettings = await getWalletConnectV2Settings(
      "eip155",
      [1, 137, 5],
      "04309ed1007e77d1f119b85205bb779d"
    );
    const walletConnectV2Adapter = new WalletConnectV2Adapter({
      adapterSettings: { ...defaultWcSettings.adapterSettings },
      loginSettings: { ...defaultWcSettings.loginSettings },
    });

    web3auth.configureAdapter(walletConnectV2Adapter);

    // adding metamask adapter
    const metamaskAdapter = new MetamaskAdapter({
      clientId : "BODWZ6bS1HF4cxbj98vCyrqGNZbx2xh9tO4PC9kq7pV7p6mEkLWmA5VzCYYtt5okZ_5_xUzgbE26r1rhD9j_xLs",
      sessionTime: 3600, // 1 hour in seconds
      web3AuthNetwork: "cyan",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      },
    });
    // we can change the above settings using this function
    metamaskAdapter.setAdapterSettings({
      sessionTime: 86400, // 1 day in seconds
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      },
      web3AuthNetwork: "cyan",
    });

    // it will add/update  the metamask adapter in to web3auth class
    web3auth.configureAdapter(metamaskAdapter);

    
    await web3auth.initModal();
    await web3auth.connect();


    // const web3AuthInstance = new Web3AuthCore({
    //   clientId: "BODWZ6bS1HF4cxbj98vCyrqGNZbx2xh9tO4PC9kq7pV7p6mEkLWmA5VzCYYtt5okZ_5_xUzgbE26r1rhD9j_xLs", // created in the Web3Auth Dashboard as described above
    //   chainConfig: {
    //     chainNamespace: CHAIN_NAMESPACES.EIP155,
    //     chainId: '0x1', // ChainID in hexadecimal
    //   },
    //   storageKey: 'local',
    // })

    // const openLoginAdapter = new OpenloginAdapter({
    //   adapterSettings: {
    //     network: 'mainnet',
    //     clientId: "BODWZ6bS1HF4cxbj98vCyrqGNZbx2xh9tO4PC9kq7pV7p6mEkLWmA5VzCYYtt5okZ_5_xUzgbE26r1rhD9j_xLs",
    //   },
    //   loginSettings: {
    //     mfaLevel: 'none',
    //   },
    // })
    
    // web3AuthInstance.configureAdapter(openLoginAdapter)

    // const openloginAdapter = new OpenloginAdapter({
    //   adapterSettings: {
    //     uxMode: "popup",
    //     loginConfig: {
    //       // Google login
    //       google: {
    //         verifier: "YOUR_GOOGLE_VERIFIER_NAME", // Pass the Verifier name here
    //         typeOfLogin: "google", // Pass on the login provider of the verifier you've created
    //         clientId: "GOOGLE_CLIENT_ID.apps.googleusercontent.com", // Pass on the Google `Client ID` here
    //       },
    //     },
    //   },
    // });
    // web3auth.configureAdapter(openloginAdapter);
    
    // Initialize Modal
    // await web3auth.initModal();
    
    // Login with Google
    // await web3auth.connect();


  }

  const checkChainNumber = async () => {

    try {

      // console.log()
      window.web3 = new Web3(window.ethereum)
      const chainId = await window.web3.eth.getChainId()
      console.log("chainId",chainId)

      if(chainId === 5){
        setChainMatch(true)
      } else {
        setChainMatch(false)
      }
      
    } catch (error) {
      
    }
  }


  const loadAsset = async () => {

    // console.log("loading 시작")
    // console.log("userAccount",userAccount)
    setIsloading(true)

    if(userAccount !== ""){
      // const assetList = await axios.get(`https://wp22qg4khl.execute-api.ap-northeast-2.amazonaws.com/v1/service/ethManagePool?userAddr=${userAccount}&contractAddress=${id}`)
      window.web3 = new Web3(window.ethereum)
      const weiBalance = await window.web3.eth.getBalance(userAccount)
      const ethBalance = window.web3.utils.fromWei(weiBalance)
      // console.log("ethBalance",ethBalance)

      const tokenAddress = "0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F"
      const userAddress = "0x1e572678738674481dE656233E8456BBc4b3b0aB"
      const tokenABI = [
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "balance",
              "type": "uint256"
            }
          ],
          "payable": false,
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "type": "function"
        }
      ];

      const tokenContract = new window.web3.eth.Contract(tokenABI, tokenAddress);
      const stETHBalance = await tokenContract.methods.balanceOf(userAddress).call().then((balance) => {
        return window.web3.utils.fromWei(balance)
      })
      .catch((error) => {
        console.error('Error fetching token balance:', error);
      });

      // console.log("stETHBalance",stETHBalance)
    
      // const stETH = window.web3.utils.fromWei(stETHBalance)
      

      const assetList = {
        data : {
          "poolName": "",
          "category": "",
          "contractAddress": "",
          "investedToken": stETHBalance,
          "availableToken": ethBalance,
          "tvlToken": 0,
          "tvlKRW": 0,
          "apr": 0
        }
      }
      console.log("assetList",assetList.data)
      setDetailAsset(assetList.data)
    } else {
      setDetailAsset({
        "poolName": "",
        "category": "",
        "contractAddress": "",
        "investedToken": 0,
        "availableToken": 0,
        "tvlToken": 0,
        "tvlKRW": 0,
        "apr": 0
      })
    }
    console.log("loading 종료")
    setIsloading(false)    
  }

  const requestWithdrawal = async () => {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    setIsloading(true)

    let trxReturn = {}

    if(walletProvider === "metamask"){

      if(poolInfos[id].poolToken === "KLAY"){
        // trxReturn = await metamaskWithdrawalExecutor(userAccount, id, withdrawalAmount, detailAsset.investedToken)
      } else {
        // trxReturn = await metamaskOusdtWithdrawalExecutor(userAccount, id, withdrawalAmount, detailAsset.investedToken)
      }

      setIsloading(false)

      Toast.fire({
        icon: 'success',
        title: '인출이 성공적으로 실행되었습니다.'
        // html: `<a href=https://scope.klaytn.com/tx/${trxReturn.transactionHash} target="_blank">상세내역보기</a>`
      })

      await loadAsset()


    } else {

    }
  
  }

  const requestSwap = async () => {

    if(walletProvider === "metamask"){

      
      // metamaskWithdrawalExecutor(userAccount, id, withdrawalAmount, detailAsset.investedToken)

    } else {

    }

  }


    // 월렛연결 모달 열기
  const openModal = () => {
      dispatch(walletConnectModalOpen())
  }


  const requestDeposit = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()
    // console.log("chainId",chainId)

    if(chainId !== 5){
      alert("Unsupported Chain!")
    } else {

    if(walletProvider === "metamask"){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      setIsloading(true)

      let trxReturn = {}

      console.log("depositAmount", depositAmount)

      trxReturn = await metamaskDepositExecutor(userAccount, id, depositAmount)
      await loadAsset()

      Toast.fire({
        icon: 'success',
        title: '예치가 성공적으로 실행되었습니다.'
        // html: `<a href=https://scope.klaytn.com/tx/${trxReturn.transactionHash} target="_blank">상세내역보기</a>`
      })

      setIsloading(false)
    }}
  }


  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-100 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Return
      </button>
      // <button onClick={web3Login} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-100 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      // Return
      // </button>
    )
  }

  const NextButton = () => {
    // const navigate = useNavigate();
    // const onClickBtn = () => {
    //   navigate(-1);
    // };
    return (
      <button onClick={web3Balance} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-100 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      NextButton
      </button>
    )
  }

  

  const selectionDeposit = () => {
    setSelection("deposit")
  }

  const selectionWithdrawler = () => {
    setSelection("withdrawal")
  }

  const maxDepositHandler = () => {
    setDepositAmount(detailAsset.availableToken)
  }

  const maxWithdrawerHandler = () => {
    setWithdrawalAmount(detailAsset.investedToken)
  }

  return (
    <>
    <div>
        <div class="p-4">
          <OverBox>
          <SubTemplateBlockVertical>
          <ManageTitle>
            <Title> Deposit
              {/* <h3 class="text-base font-semibold leading-7 text-gray-900"></h3> */}
            </Title>
            <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
            {/* <NextButton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> */}
          </ManageTitle> 
                
            <div>
            <div style={{marginTop:"20px"}}></div>
              <div class="sm:px-0">        
              <div className="border border-gray-100 rounded-lg p-6 bg-white">
          <button className="flex flex-col">
            <div className="flex items-center">
              <div className="flex">
                <div className="relative">
                  <div className="relative mr-1.5 rounded-full bg-white">
                      <img class="w-10 h-10 rounded-full" src={icons["Lido"]} alt=""/>
                    <div className="absolute -right-2.5 -bottom-px">
                      <div className="w-6 h-6 p-[3px] border rounded-full z-10 bg-white" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                      <img class="w-6 h-4 rounded-full" src={icons["Ethereum"]} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mx-4 text-xl font-bold text-neutral-800">
                Lido Staking
              </p>
            </div>

            <div className="mt-5">
              <p className="font-semibold text-left">Balance : {detailAsset.investedToken} stETH</p>
              {/* <p className="text-neutral-600 text-left">stETH</p> */}
            </div>

          </button>
        </div>      
              <div style={{marginTop:"20px"}}></div>
              <div className="border border-gray-100 rounded-lg p-5" style={{"backgroundColor":"white"}}>
              <div style={{marginTop:"10px"}}></div>

              {selection === "deposit" ? 

              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-gray-200 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
                  <li class="w-full">
                      <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                        deposit
                      </a>
                  </li>
                  <li class="w-full">
                      <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                        withdrawal
                      </a>
                  </li>
              </ul>
              :
              <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-gray-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
              <li class="w-full">
                  <a onClick={selectionDeposit} href="#" class="inline-block w-full p-2 text-gray bg-white rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                   deposit
                  </a>
              </li>
              <li class="w-full">
                  <a onClick={selectionWithdrawler} href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                  withdrawal
                  </a>
              </li>
              </ul>
              }

          <div style={{marginTop:"20px"}}></div>
              <div className="pt-1">
              <div style={{marginTop:"10px"}}></div>
              <div class="items-center">   
                                
                  <div class="relative w-full">
                      {selection === "deposit" ? 
                      <>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            </div>
                            <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.availableToken}`} required  />
                            <button onClick={maxDepositHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                        </div>
                      </>
                      :
                      <>
                        <div class="relative">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          </div>
                          <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)} class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${detailAsset.investedToken}`} required />
                            <button onClick={maxWithdrawerHandler}  class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
                          </div>
                      </>
                    }
                  </div>              
              </div>

          <div style={{marginTop:"20px"}}></div>
            <div style={{textAlign:"right"}}>
              <div style={{marginTop:"30px"}}></div>
                
                {userAccount === "" ?
                    <button onClick={openModal} style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Connect Wallet
                      </span>
                    </button>
                    :
                    chainMatch && (depositAmount > 0) ?
                    <button onClick={requestDeposit} style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
                    </button>
                    :
                    <button style={{width:"100%", height:"50px"}} type="submit" class="py-2.5 px-3 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Submit
                      </span>
                    </button>
                  }
              </div>
            </div>
          </div>
          </div>

          <div style={{marginTop:"30px"}}></div>
          <div class="mt-6"></div>
          </div>
          {!chainMatch ? 
          <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-100 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Unsupported chain. Please switch to Goerli in your wallet and restart the page.</span> 
                </div>
                </div>

                :
                <></>
              }
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>

      
      
    
    </>
  );
}

function TransScale(props) {

  return (
    <>
      Pool TVL :   
      {props > 10000000000 ?
        " " + (props / 10000000000).toFixed(2) + " B USD"
        :props > 1000000 ?
        " " + (props / 1000000).toFixed(2) + " M USD"
        : props >  10000 ?
        " " + (props / 1000).toFixed(2) + " K USD"
        :
        " " + props + " USD"
      }
    </>
  )

}

const ManageTitle = styled.div`
  width: 460px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`
/* style={{width:"460px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}> */


const ChartCover = styled.div`
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr;
  /* grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr; */
`

const AppleChart = styled.div`
  background: #111539;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 25px;
`


const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
  }
`

const OverBox = styled.div`

  position: relative;
  margin: 0px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow: auto;
  padding: 30px;

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
    margin: 0px auto;
    width: 460px;
    /* padding-bottom: 10px; */
    position: relative; 
    /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
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
    background-clip: border-box;
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


const SubTemplateBlockSub = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    width: 1136px;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0.1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
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




export default Detail;

