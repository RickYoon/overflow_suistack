import React, {useState,useEffect} from "react";
import * as Styled from "./TvlGainerCard.style"
import icons from "../../../assets/tokenIcons"
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react'


function TvlLoserCard(props) {

  console.log("props",props.data)
  // console.log("props",props.isLoading)
  const skeletonArray = ['','','']

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

  const [toppools,setToppools] = useState([{
    poolinfo : [],
    protocol:"",
    type: "",
    reward: [],
    tvl: 0,
    apr:0,
    aprDiff: 0,
    tvlDiff: 0,
    stableOnly: "no",
    klayOnly: "no"
  }])

  useEffect(() => {
    loadPools()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data])

  function loadPools() {

    let TempArray = []

    if(props.data.length > 0){
      
      props.data.sort(function(a,b){
        if((a.tvlDiff/a.tvl) > (b.tvlDiff/b.tvl)) return 1;
        if((a.tvlDiff/a.tvl) === (b.tvlDiff/b.tvl)) return 0;
        if((a.tvlDiff/a.tvl) < (b.tvlDiff/b.tvl)) return -1;
      })
  
      for(let i=0;i<5;i++){
        if(props.data[i]!==undefined){
          TempArray.push(props.data[i])
        }
      }
      setToppools(TempArray)   

    } else {

      setToppools([{
        poolinfo : [],
        protocol:"",
        type: "",
        reward: [],
        tvl: 0,
        apr:0,
        aprDiff: 0,
        tvlDiff: 0,
        stableOnly: "no",
        klayOnly: "no"
      }])

    }

    // console.log("프로프스ㄴㄴ", props.data.length)

  }
  
  return (
    <>
      <Styled.Topdash>
          <Styled.UpperColumn>
              Top TVL Loser Pools
              <Styled.Righttext> 1day - TVL / APR </Styled.Righttext>
          </Styled.UpperColumn>
          <Styled.LowerColumn style={{marginTop:"10px"}}>
              {props.isLoading ? 
                skeletonArray.map((arr)=>
                   <Styled.ProjectBox>
                       <tr>
                            <th style={{width:"30px"}}><Styled.ProductSkeleton /></th>
                            <td style={{width:"45px"}}><Styled.IconSkeleton /></td>
                            <td style={{width:"90px"}}><Styled.ProductSkeleton style={{width:"80%"}} /></td>
                            <td style={{width:"60px", fontSize:"13px", textAlign:"center", color:"red"}}><Styled.ProductSkeleton /></td>
                            <td style={{width:"60px", fontSize:"12px", paddingLeft:"5px", textAlign:"center"}}><Styled.ProductSkeleton /></td>
                       </tr>
                    </Styled.ProjectBox>    
                    )          
              :              
              toppools.map((pool,index) => 
              <Styled.ProjectBox style={{height: "40px"}}>
                  <Td width="10%" style={{ width: "20px", textAlign: "center", fontSize: "13px" }}>{index+1}</Td>
                  <Tr>
                  <PoolinfoBox>
                    <Iconbox>
                    {pool.poolinfo.map((token)=>(
                      <Iconwrapper>
                        {token.split("-")[0] === "klap" ?
                          <Img src={icons[token.replace("-","")]} alt="logo" fontSize="20px"/> :
                          icons[token] === undefined ? 
                          <Img src={icons["defToken"]} alt="logo" fontSize="20px"/> :
                          <Img src={icons[token]} alt="logo" fontSize="20px"/>
                        }
                      </Iconwrapper>
                    ))}
                    </Iconbox>
                    <Explainbox>
                    <Protocol>
                    {pool.protocol.split("-")[0] === "klaystation" ? 
                      <Span onClick={()=>window.open(homeJson["klaystation"], "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {pool.protocol} </Span>       
                      :
                      <Span onClick={()=>window.open(homeJson[pool.protocol], "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")}>
                      {pool.protocol} </Span>
                    }

                    </Protocol>
                    <Token>

                    </Token>
                    </Explainbox>
                  </PoolinfoBox>
                  </Tr>
                  <Td width="300px" style={{fontSize:"13px", color:"blue", textAlign: "right"}}>
                  {Math.abs(pool.tvlDiff) > 1000000000 ?
                        <span> $ {Number(pool.tvlDiff / 1000000000).toFixed(1)}B </span> :
                        Math.abs(pool.tvlDiff) > 1000000 ?
                            <span> $ {Number(pool.tvlDiff / 1000000).toFixed(1)}M </span> :
                            Math.abs(pool.tvlDiff) > 1000 ?
                                    <span> $ {Number(pool.tvlDiff / 1000).toFixed(0)}K </span> :
                                    <span> $ {Number(pool.tvlDiff).toFixed(0)}</span>
                    }<br/>
                        {(100*(pool.tvlDiff)/(pool.tvl)).toFixed(1)} %
                  </Td>
                  {/* <Td width="300px" style={{fontSize:"13px", color:"black", textAlign: "right"}}>
                        {(pool.apr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} %<br/>
                        {((pool.aprDiff)/(pool.tvl)).toFixed(1)} %
                  </Td> */}
              </Styled.ProjectBox>
              )
              }
          </Styled.LowerColumn>
      </Styled.Topdash>

    </>
  );
}

function TvlDiffAfter(props) {

    // console.log("props",props)
    let difference = props.data.tvl-props.data.tvltwo
    // +{(toptvlElement.tvl-toptvlElement.tvltwo).toFixed(0)}
    return (
        <>
        {difference > 1000000 ?
            <>{(difference/1000000).toFixed(1)} M</> :
            difference > 1000 ?
            <>{(difference/1000).toFixed(1)} K</> :
            <>{difference.toFixed(1)}</>
            }

        
        </>
    )
}


const Tr = styled.tr`
/* height : 40px;
line-height: 40px; */
  &:hover {
    height : 40px;
    /* background-color: #E8E8E8; */
    /* border-radius:10px; */
    /* line-height: 40px; */
  }
`

const Td = styled.td`

  vertical-align:middle;
  padding-left: 1em;
  width: ${props => props.width || "30px"};

  @media screen and (max-width: 500px){
    height:30px;
    font-size: 15px;
    width: 100px;
    }
`

const Tdp = styled.td`
  /* width: ${props => props.width || "30px"}; */
  vertical-align:middle;
  padding-left: 1em;
  width: 100px;
  &:hover {
    color:#3366cc;
    text-decoration: underline;
  };

  @media screen and (max-width: 500px){
    width: 130px;
    text-align: left;
  }

`

const Protocol = styled.div`
  padding-left: 15px;
  text-decoration: underline;
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
  width: 120px;
`

const Img = styled.img`
    /* width: 100%; */
    height: 100%;
    /* width: */
    /* height:25px; 
    width:25px;  */
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
    width: 15px;
    height: 25px;
    /* overflow: hidden; */
`

const Iconbox = styled.div`
  display: flex;
  flex-direction: row;
`

const Span = styled.span`
  cursor: pointer;
  /* color: gray;
  float: right; */

  &:hover {
    color: blue;
    text-decoration: underline;
  };
`

export default TvlLoserCard;
  

// props.data.map((toptvlElement,index) => 
//                         <Styled.ProjectBox>
//                             <Tr>
//                                 <Td width="10%">{index+1}</Td>
//                                 <Td width="30px" >
//                                     <Styled.Img src={icons[toptvlElement.proj]} alt="logo" height="30px" width="30px" style={{ padding: "1px", verticalAlign: "middle", borderRadius: "15px" }} /> 
//                                 </Td>
//                                 <Tdp>
//                                     <Link to={`/project/${toptvlElement.proj}`}>
//                                         {toptvlElement.proj}
//                                     </Link>
//                                 </Tdp>
//                                 <Td width="55px" style={{textAlign:"right",fontSize:"13px", color:"red", whiteSpace: "nowrap" }}>
//                                     {(toptvlElement.difftwo).toFixed(1)} %
//                                 </Td>
//                                 <Td width="55px" style={{textAlign:"right",fontSize:"13px", whiteSpace: "nowrap" }}>
//                                     <TvlDiffAfter data={toptvlElement} />
//                                 </Td>
//                             </Tr>
//                         </Styled.ProjectBox>
                        
//                 )



// <Td width="300px" >
{/* <PoolinfoBox>
<Iconbox>
{toptvlElement.poolinfo.map((token)=>(
<Iconwrapper>
  {token.split("-")[0] === "klap" ?
    <Img src={icons[token.replace("-","")]} alt="logo" fontSize="20px"/> :
    icons[token] === undefined ? 
    <Img src={icons["defToken"]} alt="logo" fontSize="20px"/> :
    <Img src={icons[token]} alt="logo" fontSize="20px"/>
  }
</Iconwrapper>
))}
</Iconbox> */}
// <Explainbox>
//   <Protocol>
//   {toptvlElement.protocol.split("-")[0] === "klaystation" ? 
//       <>{toptvlElement.protocol}</>    
//     :
//     <>{toptvlElement.protocol}</>    
//   }
//   </Protocol>
//   <Token>
//     {toptvlElement.poolinfo.map((token,index)=>{
//       if (index + 1 === toptvlElement.poolinfo.length) {
//         return token
//       } else {
//         return token  + " + " 
//       }
//     })}
//   </Token>
// </Explainbox>
// </PoolinfoBox>
// </Td>
// <Td width="55px" style={{textAlign:"right",fontSize:"13px", color:"red", whiteSpace: "nowrap" }}>
// {(toptvlElement.tvlDiff/toptvlElement.tvl).toFixed(1)}
// </Td>
// <Td width="55px" style={{textAlign:"right",fontSize:"13px", whiteSpace: "nowrap" }}>
// {(toptvlElement.tvlDiff)}
// </Td>