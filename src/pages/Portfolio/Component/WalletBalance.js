// import * as Styled from "./Selector.style"
import React, {useContext, useState} from "react";
import icons from "assets/tokenIcons"
import styled, { keyframes } from 'styled-components';

function WalletBalance(props) {

  const pooldata = props.data



  console.log("props",props.data)

      const homeJson = {
        "Klayswap" : "https://klayswap.com/exchange/pool",
        "Kokonutswap" : "https://kokonutswap.finance/pools",
        "Klaymore": "https://klaystake.house/",
        "klaystation": "https://klaystation.io/staking",
        "stakely": "https://stake.ly/klay",
        "klexfinance": "https://app.klex.finance/",
        "PangeaSwap": "https://app.pangeaswap.com/pool",
        "hashquark": "https://klayportal.hashquark.io/",
        "Claimswap": "https://app.claimswap.org/",
        "PALA": "https://pala.io/dex"
      }

      function formatNumber(number) {

        const formattedNumber = Number(number).toFixed(2);
        const numberWithCommas = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      
        return numberWithCommas;
      }

  return (
    <>
    <ContentBox>
    <div class="p-6 px-0">
    <table class="w-full">

    <thead class="bg-white border-b border-blue-gray-100">
      <tr>
        <th class="bg-blue-gray-50/50 pl-4">
          <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Asset</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Price</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Balance</p>
        </th>
        <th class="bg-blue-gray-50/50 p-4">
        <p class="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-left">Value</p>
        </th>
      </tr>
    </thead>
    
    <tbody class="bg-white">
      
    {pooldata.map((token)=>(
      <tr>
        <td className="border-b border-blue-gray-50">
          <div className="flex items-center gap-3 pl-4">
          <PoolinfoBox>
                    <Iconbox>                    
                      <Iconwrapper>
                          <Img src={token.logo} alt="logo" fontSize="20px"/>
                      </Iconwrapper>                   
                    </Iconbox>
                    <Explainbox>
                    <Protocol>
                    {token.symbol}
                    </Protocol>
                    <Token>
                    
                    </Token>
                    </Explainbox>
                  </PoolinfoBox>
        </div>
        </td>

        <td className="p-4 border-b border-blue-gray-50">
        <Th style={{fontSize:"12px", fontWeight:"normal"}}>
            ${token.price}
        </Th>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
        <Th style={{fontSize:"13px", fontWeight:"normal"}}>
        {formatNumber(token.balance)}
        </Th>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <div style={{fontSize:"13px", fontWeight:"normal"}}>
                $ {formatNumber(token.usdValue)}
            </div>
          </div>
        </td>
      </tr>
       ))}
    </tbody>
  </table>
    
</div>

</ContentBox>

    </>
  );
}

const ContentBox = styled.div`
  height: auto;
  min-height: 500px;
  /* padding-bottom: 50px;  */
`


const Span = styled.span`
  cursor: pointer;
  /* color: gray;
  float: right; */

  /* &:hover {
    color: blue;
    text-decoration: underline;
  }; */
`


const Protocol = styled.div`
  padding-left: 15px;
  /* text-decoration: underline; */
  font-size: 12px;
  
`

const Token = styled.div`
  padding-left: 15px;
    color: #657795;
    font-size: 11px;
    text-align: left;
`

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

const Img = styled.img`
    /* width: 50px; */
    height: 40px;
    /* width: */
    /* /* height:25px;  */
    border:1px solid #eaeaea;
    border-radius:50%;
    background-color: #f5f5f5;
    /* padding: 1px; */
    /* background-color:ㅎㄱ묘; */
  `

const Imgs = styled.img`
  width: 20px;
  height: 20px;
  border: 0.5px solid #eaeaea;
  border-radius:50%;
`

const Iconwrapper = styled.div`
    /* width: 30px;
    height: 20px; */
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`


const TodoTemplateBlock = styled.div`
  /* width: 100%; */
  width:1024px;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 1px 1px 1px gray;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  /* margin-top: 16px; */
  margin-bottom: 16px;
  padding-left:18px;
  padding-right:20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  min-width: 0px;
  overflow-wrap: break-word;
  background-color: rgb(255, 255, 255);
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
  overflow: visible;
  
  .loader {
    margin-left:200px;
  }
  
  @media screen and (max-width: 950px){
    width: 90%;
    padding-left:20px;
    padding-right:20px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px gray;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;

    .loader {
      margin-left:135px;
    }
    .mobtrans{
      display:none;
    }
    .tablecss{
      font-size:13px;
      
    }
    /* .head{
    }
    .headcol:before {
      content: 'Row ';
    }
  .content {
    background: #8cdba3;
} */
  }
`;

const Th = styled.th`
  height:25px;
  vertical-align:middle;
  padding-left:5px;
  @media screen and (max-width: 500px){
    max-width: 150px;
  }

`;

const Tdc = styled.td`
  @media screen and (max-width: 500px){
    display:none;
  }
  height:25px;
  vertical-align:middle;
`;


const Td = styled.td`
  height:25px;
  vertical-align:middle;
`

const Tr = styled.tr`
  &:hover {
    background-color: #E8E8E8;
  }
`





export default WalletBalance;