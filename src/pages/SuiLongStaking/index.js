import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import React from "react";
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import './index.css';

function SuiLongStaking() {

  return (
    <>
      <div>
        <div className="mt-10">   
        <div/>   
          <OverBox>
              <SubTemplateBlockVertical>                
                <Wrappertitle>
                    <Title>Sui Staking</Title>                
                </Wrappertitle>

                <div style={{paddingTop:"20px"}}/>   

                  <Wrappertitle>
                    <div className="text-center text-lg text-neutral-800">
                        Combo Investment
                    </div>                
                  </Wrappertitle>

                  <Link to="/yield/long/staking">
                    <div className="mt-5 border border-black p-3 bg-white hover:bg-gray-100 hover:border-blue-400">
                        <p className="text-xl font-medium">Haedal + Cetus (17.7%) </p>
                        <p className="text-mx text-gray-500"> - APR : - Staking (0.65 %) + LP (16.4%) </p>
                      </div>                    
                  </Link>
                   
                <div style={{paddingTop:"20px"}}/>   

                  <Wrappertitle>
                    <div className="text-center text-lg text-neutral-800">
                        Single Investment
                    </div>                
                  </Wrappertitle>


                  <Link to="/yield/long/staking">
                    <div className="mt-5 border border-black p-3 bg-white hover:bg-gray-100 hover:border-blue-400">
                        <p className="text-xl font-medium">Haedal (1.3%) </p>
                        <p className="text-mx text-gray-500"> - APR : - Staking (1.3 %)</p>
                      </div>                    
                  </Link>

                

                  <div style={{marginTop:"30px"}}></div>

                  {/* <Wrappertitle>
                    <div className="text-center text-lg text-neutral-800">Choose the type of deFi</div>                
                    </Wrappertitle>
                      
                      <Link to="/detail/0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F">
                        <div className="mt-5 border border-gray-100 rounded-lg p-3 bg-white hover:bg-gray-100 hover:border-blue-400">
                                <p className="text-xl font-medium">Staking</p>
                                <p className="text-mx text-gray-500"> - gain from both coin value and interest income.</p>
                        </div>                    
                    </Link>
                    <Link to="/detail/0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F">
                      <div className="mt-5 border border-gray-100 rounded-lg p-3 bg-white hover:bg-gray-100 hover:border-blue-400">
                              <p className="text-xl font-medium">Lending</p>
                              <p className="text-mx text-gray-500"> - yield without worrying about price fluctuations.</p>
                      </div>                    
                    </Link>
                    <Link to="/detail/0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F">
                      <div className="mt-5 border border-gray-100 rounded-lg p-3 bg-white hover:bg-gray-100 hover:border-blue-400">
                              <p className="text-xl font-medium">LP Farming</p>
                              <p className="text-mx text-gray-500"> - yield without worrying about price fluctuations.</p>
                      </div>                    
                 </Link> */}
                  <div style={{marginTop:"30px"}}></div>

              
            </SubTemplateBlockVertical>
            
          </OverBox>
        </div>
      </div>



    <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    Connect wallet
                </h3>
            </div>
            <div class="p-6">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>

            </div>
      </div>
    </div>
  </div>
    </>
  );
}

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


const Dot = styled.div`
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`

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
  font-size: 45px;
  text-align :center;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  /* text-align: center; */
  
  /* width: 1136px; */
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
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  /* height: 100vh; */
  overflow: auto;
  /* padding: 30px; */

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
    width: 600px;
    border-top: 5px solid black;
    padding-top: 50px; /* 왼쪽 내부 간격 */
    border-left: 5px solid black;
    padding-left: 50px; /* 왼쪽 내부 간격 */
    border-right: 5px solid black;
    padding-right: 50px; /* 오른쪽 내부 간격 */
    border-bottom: 5px solid black;
    padding-bottom: 50px; /* 오른쪽 내부 간격 */

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


export default SuiLongStaking;

