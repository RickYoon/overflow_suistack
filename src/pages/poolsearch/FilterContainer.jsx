import React, {useContext} from "react";
import { PoolContext } from 'components/context/PoolContext';
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip"
import styled, { keyframes } from "styled-components";

function FilterContainer() {

  const { stable, stableSetter, klay, klaySetter } = useContext(PoolContext);

  return (
    <>

      <Searchbox>
        <Filterbox>
          <input type="checkbox" name="xxx" value="yyy" checked={stable} onClick={stableSetter}></input>
          <span style={{paddingLeft:"5px", verticalAlign: "center"}}>Stable-Only</span>
          <input style={{marginLeft:"25px", verticalAlign: "center"}} type="checkbox" name="xxx" value="yyy" checked={klay} onClick={klaySetter}></input>
          <span style={{paddingLeft:"5px", verticalAlign: "center"}}>Klay-Only</span>
        </Filterbox>
      </Searchbox>

    </>
  );
}

const Searchbox = styled.div`
  width: 100%;
  margin: 0 auto;
  gap: 24px;
  border: 1px solid #edeff1;
  display: flex;
  padding: 15px 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 1px 1px 1px gray;

  @media screen and (max-width : 950px){
  width: 90%;
  box-shadow: 1px 1px 1px gray;
  }

`

const Filterbox = styled.a`
  color: black;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .05rem;
  /* padding: 0.5rem 1rem; */
`


export default FilterContainer;
