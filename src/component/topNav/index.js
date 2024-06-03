import 'App.css'; 
import React, {useEffect} from "react";
import icons from "assets/tokenIcons"
import { useDispatch , useSelector } from 'react-redux';
import { 
    walletConnectModalOpen, 
    walletConnectModalClose,
    walletManageModalOpen,
    walletManageModalClose,
    chainManageModalOpen,
    chainManageModalClose,
    connectMetamask, 
    connectKaikas, 
    connectAddress,
    disconnect} from 'redux/reducers/WalletActions'
import {Link} from "react-router-dom"
import ethereum from '../../assets/ci/ethereum.png';
import { useParams } from "react-router-dom";
import { ConnectButton,useWallet } from "@suiet/wallet-kit";


function Topnav () {

    // dispatch (Reducer 에게 엑션을 발생시키는 녀석)
    const { chain } = useParams();  
    const dispatch = useDispatch();

    // redux store 상태 불러오기
    const userAccount = useSelector(state => state.account) // 지갑주소
    const walletProvider = useSelector(state => state.walletProvider) // 프로바이더
    const walletConnectModal = useSelector(state => state.walletConnect) // 지갑 연결 모달 상태
    const walletManageModal = useSelector(state => state.walletManage) // 지갑 관리 모달 상태
    const chainManageModal = useSelector(state => state.chainManage) // 체인 연결 모달 상태

    // 월렛연결 모달 열기
    const openModal = () => {
        dispatch(walletConnectModalOpen())
    }

    const openChainModal = () => {
        console.log("chainManageModal",chainManageModal)
        dispatch(chainManageModalOpen())
    }
  
    // 메타마스크 연결하기
    const conMetamask = () => {
        dispatch(connectMetamask())
        dispatch(walletConnectModalClose())
        dispatch(walletManageModalClose())
    }

    // 카이카스 연결하기
    const conKaikas = () => {
        dispatch(connectKaikas())
        dispatch(walletConnectModalClose())
        dispatch(walletManageModalClose())
    }

    // 지갑주소 연결하기
    const conAddress = async () => {
        dispatch(connectAddress(tempAccountInfo))
        dispatch(walletConnectModalClose())
        dispatch(walletManageModalClose())
        localStorage.setItem("address", tempAccountInfo)
        localStorage.setItem("wallet", "noProvider")
    }
        
    // 연결상태 초기화 하기
    const walletDisconnect = async () => {
        dispatch(connectAddress(""))
        localStorage.setItem("address", "")
        dispatch(disconnect())
    }

    // useEffect(()=>{

    // 접속을 하고 새로 고침을 하면,
    // 마지막 접속 정보를 기준으로 연결을 시도하고, 실패하면 안한다. 

    //     const lastWallet = localStorage.getItem("wallet");
    //     const lastAddress = localStorage.getItem("address");

    // },[userAccount])

    const [tempAccountInfo, setTempAccountInfo] = React.useState("")

    const klayButton = () => {
        console.log("test button")
    }

    return (
        <>
            <nav class="">
                <div class="max-w-screen-md flex flex-wrap items-center justify-between mx-auto p-3">
                    <a href="https://main.d1jfku59jtk0ay.amplifyapp.com/" class="flex items-center">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fistack</span>
                    </a>

                    <div class="pl-20 items-center justify-between hidden w-full md:flex md:w-auto">
                  <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" style={{marginRight:"20px"}}>

                    <li>            
                        <Link to="/portfolio" class="flex items-center">
                          <span class="pt-3">
                          Wallet
                          </span>
                        </Link>
                    </li>

                    <li>                 
                    <ConnectButton />
                    </li>


                  </ul>
                </div> 
                    
                        
                </div>
            </nav>
        </>
    );
}



export default Topnav;

