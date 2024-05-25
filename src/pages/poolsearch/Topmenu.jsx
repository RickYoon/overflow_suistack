import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";

function Topmenu() {

  const { order, tvlSorting, aprSorting } = useContext(PoolContext);

  return (
    <>
        <Topdash>
        {order === "tvl" ? 
                <>
                    <Selectionbutton onClick={tvlSorting}>
                      Top TVL
                    </Selectionbutton>
                    <Unselectionbutton onClick={aprSorting} style={{marginLeft:"10px"}}>
                      Top APR
                    </Unselectionbutton> 
                </>
                :
                <>
                  <Unselectionbutton onClick={tvlSorting}>
                    Top TVL
                  </Unselectionbutton>
                  <Selectionbutton onClick={aprSorting} style={{marginLeft:"10px"}}>
                    Top APR
                  </Selectionbutton> 
                </>
              }

          </Topdash>
    </>
  );
}

const Filterbox = styled.a`
  color: black;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  /* padding: 0.5rem 1rem; */
`

const Selectionbutton = styled.a`
  background-color: #0a1930;
  border: 1px solid #fff;
  border-radius: 999px;
  color: #fff;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all .3s ease-in-out;
  cursor: pointer;
`

const Unselectionbutton = styled.a`
  /* background-color: #0a1930; */
  border: 1px solid #fff;
  border-radius: 999px;
  color: black;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  text-transform: capitalize;
  transition: all .3s ease-in-out;
  cursor: pointer;

`

const Topdash = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 30px;
  @media screen and (max-width : 950px){
    width: 90%;
  }
`

const Leftcolumn = styled.div`
  width:30%;

  @media screen and (max-width: 500px){
  width:200px;
  /* padding: 0;
  margin-bottom:10px;
  margin-right: 0px; */

  }
`


const Row = styled.div`
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-between;
  @media screen and (max-width: 500px){
    width:380px;
    display:flex;
    flex-direction:row;
}`

const Rightcolumn = styled.div`
  /* width:15%; */
  float:right;

  @media screen and (max-width: 500px){
    float:right;
    padding-right:20px;

  }
`


export default Topmenu;
