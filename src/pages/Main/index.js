import 'App.css'; 
import react, {useState, useEffect} from "react";
import styled, { keyframes } from 'styled-components';
import { useWallet } from "@suiet/wallet-kit";

import {lendSuiToScallop} from "./functions/scallop/depositSui.js"

import {cetusSwapExec} from "./functions/cetusSwapExec.js"
import {oracleUpdate} from "./functions/updateOracle.js"
// import {scallopMint} from "./functions/scallopDeposit.js"
import {BuckPosition} from "./functions/makeBuckPosition.js"
import {LendToSuilend} from "./functions/suilend/lendToSuilend.js"
import {LendSuiNavi} from "./functions/navi/lendSui.js"
// import {FlashloanLeverage} from "./functions/buck/FlashLeverage.js"

import "@suiet/wallet-kit/style.css";
import Swal from 'sweetalert2'

function MainPage() {

  const wallet = useWallet(); 

  const [suiAmount, setSuiAmount]= useState(0)

  const handleInputChange = (e) => {
    setSuiAmount(e.target.value);
};
    // DepositSui

    async function handleLendSuiScallop(walletAddress, Amount) {
      
      if (!wallet.connected) return;
      const txb = await lendSuiToScallop(wallet.address, suiAmount);
  
      try {
        // call the wallet to sign and execute the transaction
        const res = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: txb,
        });
    
        // console.log("transaction success!", res);
  
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

      Swal.fire({
        title: "Success!",
        html: `
              <b>Check the transaction</b> ->
              <a href="https://suivision.xyz/txblock/${res.digest}" target="_blank">Link</a> 
           `
      });
    } catch (e) {
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
                  <input value={suiAmount} onChange={handleInputChange} type="search" id="search" class="block w-full p-4 text-xm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                  <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Max</button>
              </div>             

              <div className="md:flex md:justify-center md:items-center mt-10">
                  <div className="flex flex-row" style={{fontSize:"20px"}}>
                      <div>Select Single Finance</div>
                  </div>                
              </div>

              <div class="flex space-x-5 mt-0 p-3">
                <button onClick={handleLendSuiScallop} class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
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
                <button class="bg-white hover:bg-gray-100 hover:border-blue-300 border border-red inline-block w-full p-3 text-blue-600 rounded-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
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

export default MainPage;