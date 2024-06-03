import 'App.css'; 
import react, {useState, useEffect} from "react";
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useWallet } from "@suiet/wallet-kit";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import WalletBalance from './Component/WalletBalance'

import "@suiet/wallet-kit/style.css";

function PortfolioPage() {

  const wallet = useWallet(); 

  const [userBalance, setUserBalance] = useState({
    "totalBalance": 0,
    "tokenList": [
        {
            "tokenSymbol": "SUI",
            "tokenPrice": 0,
            "tokenAmount": 0,
            "tokenValue": 0
        }
    ]
})


  useEffect(() => {

    // updateStatus()
    if(wallet.address !== undefined){

      fetchCoins()

    }
    
  }, [wallet.address])

  async function fetchCoins() {

    var options = {
        method: 'GET',
        url: 'https://api.blockeden.xyz/sui-indexer/EYB8W68B8Q9Zpvsuj8QS/account/coins',
        params: { account: wallet.address }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        setUserBalance({      
          tokenList : response.data.result.coins
        })
    } catch (error) {
        console.error(error);
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
                      <div>Wallet</div>
                  </div>                
              </div>


              <ContentBox class="">
      <div class="bg-gray-50 h-full">
        <div class="p-4">   
          <OverBox class="bg-gradient-to-r from-green-100 to-blue-200" >
            <SubTemplateBlockVertical>     

            <WalletBalance data={userBalance.tokenList}/>
              {/* <WalletManageBox /> */}

              {/* <TotalBalanceBox data={formatNumber(userBalance.klayTotalBalance)}/> */}

              <Tabs class="pt-5">
{/* 
                <TabList>
                  <Tab>Positions</Tab>
                  <Tab>Wallet</Tab>
                  <Tab>History</Tab>
                </TabList> */}

                <TabPanels>

                  <TabPanel> 
                    {/* <PositionList lendData={userBalance.klayProtocolPosition} klayData={userBalance.klayStakingPosition} isloading={isloading}/>            */}
                  </TabPanel>

                  <TabPanel>
                    {/* <WalletBalance data={userBalance.tokenList}/> */}
                  </TabPanel>

                  <TabPanel>
                    {/* <WalletHistory data={userBalance.klayWalletHistory}/> */}
                  </TabPanel>
                  
                </TabPanels>

              </Tabs>
           </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>
      </ContentBox>
                

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


const ContentBox = styled.div`
  /* height: ;
  min-height: 100vh; */
  /* padding-bottom: 50px;  */
`


const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
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


export default PortfolioPage;