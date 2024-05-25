import React, {useContext} from "react";
import { PoolContext } from '../../component/context/PoolContext';
import styled, { keyframes } from "styled-components";
import icons from "../../assets/tokenIcons"
import * as Styled from "./ListTable.style"
import {useNavigate} from 'react-router-dom';

function ListTable() {

  const navigate = useNavigate();

  const skeletonArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  const { isloading, pooldata } = useContext(PoolContext);

  function clickHandler(contAddr,e) {

      e.preventDefault();
      navigate(`/detail/${contAddr}`);
  
  }

  console.log("pooldata",pooldata)

  return (
    <>
      <>
        <Table>
          <thead>
            <tr style={{ height: "40px", borderBottom: "2px solid black "}}>
              <Tdc>Protocol</Tdc>
              <Tdc>Tokens</Tdc>
              <Tdc>Type</Tdc>
              <Td>TVL($)</Td>
              <Td>APR(%)</Td>
            </tr>
          </thead>

          <tbody>                  
          {isloading ? 
            skeletonArray.map((skelton,index)=>(
              <tr key={index} style={{ height: "40px", borderBottom: "0.06em solid #D4D4D4 " }}>
                  <Styled.Tdc className="head" style={{ height: "20px", width: "30px", textAlign: "left", whiteSpace: "nowrap" }}>
                      <Styled.IconSkeleton style={{ padding: "1px",borderRadius: "15px"}}/>
                      <Styled.ProductSkeleton style={{whiteSpace: "nowrap", marginLeft:"10px", height:"25px"}}/>
                  </Styled.Tdc>
                  <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                  <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                  <Styled.Tdc className="head" style={{ width: "100px", fontSize:"14px", color:"#3f3f3f"}}><Styled.ProductSkeleton/></Styled.Tdc>
                  <Styled.Td className="content" style={{ width: "200px", textAlign: "right" }}><Styled.ProductSkeleton/></Styled.Td>
              </tr>
            ))
            :
            pooldata.map((pool, index) => (
              <Tr style={{height: "30px"}} className="border-b border-gray-100 cursor-pointer hover:bg-white hover:border border-gray-200" onClick={(e)=>{clickHandler(pool.swap_account, e)}}>
                <Tdc style={{ marginLeft:"10px", width: "30px", textAlign: "left", fontSize:"12px" }}>                    
                    Cetus
                </Tdc>
                <Tdc style={{ marginLeft:"10px", width: "30px", textAlign: "left", fontSize:"12px" }}>
                {pool.token_a_reserves} + {pool.token_b_reserves}
                </Tdc>
                <Tdc style={{ width: "30px", textAlign: "left", fontSize:"12px" }}>LP Pair</Tdc>
                <Tdc style={{ width: "30px", textAlign: "right", fontSize:"12px" }}>{(pool.tvl_in_usd/1000000).toFixed(2)} M</Tdc>
                <Tdc style={{ width: "30px", textAlign: "right", fontSize:"12px" }}>{(Number(pool.total_apr)*100).toFixed(2)}</Tdc>
              </Tr>
            ))
            }           
            </tbody>
        </Table>
      </>

    </>
  );
}

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
  text-align:right;
  font-size: 14px;
`

const Tr = styled.tr`
  &:hover {
    background-color: #E8E8E8;
  }
`

const Table = styled.table`
  width:600px;

`



export default ListTable;


