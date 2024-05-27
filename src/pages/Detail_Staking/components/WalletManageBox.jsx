import React, {useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import icons from "assets/tokenIcons"
import styled from 'styled-components';

function WalletManageBox({title}) {


  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Back
      </button>
    )
  }

  return (
    <>
        <div className="md:flex md:justify-between md:items-center p-3 mb-3">

            <div class="flex flex-row" style={{fontSize:"20px"}}>
                <div>DeFi Shortcuts</div>
            </div>

            {/* <div class="grid place-items-center"> */}
            
            {/* <Backbutton /> */}
            
        {/* </div>             */}
    </div>
  </>
  )
}


const Img = styled.img`
    height: 30px;
    border:1px solid #eaeaea;
    border-radius: 100%;
    background-color: #f5f5f5;
  `


export default WalletManageBox;