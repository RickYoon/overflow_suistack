import React, {useContext, useState, Fragment} from "react";
import { Dropdown,Menu } from 'semantic-ui-react'
import styled from "styled-components";
import icons from "../../assets/tokenIcons"
import { PoolContext } from '../../component/context/PoolContext';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

function Example() {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <ListboxButton>{selectedPeople.map((person) => person.name).join(', ')}</ListboxButton>
      <ListboxOptions anchor="bottom">
        {people.map((person) => (
          <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

const projectOptions = [
    {
      key: 0,
      text: 'Klayswap',
      value: 'Klayswap',
      image: { avatar: true, src: icons["Klayswap"] },
      style: { fontSize:'13px'}
    },
    {
        key: 1,
        text: 'Kokonutswap',
        value: 'Kokonutswap',
        image: { avatar: true, src: icons["Kokonutswap"] },
        style: { fontSize:'13px'}
    },
    {
        key: 2,
        text: 'klexfinance',
        value: 'klexfinance',
        image: { avatar: true, src: icons["klexfinance"] },
        style: { fontSize:'13px'}
    },
    {
        key: 3,
        text: 'PangeaSwap',
        value: 'PangeaSwap',
        image: { avatar: true, src: icons["PangeaSwap"] },
        style: { fontSize:'13px'}
    },
    {
        key: 4,
        text: 'KLAYportal',
        value: 'KLAYportal',
        image: { avatar: true, src: icons["KLAYportal"] },
        style: { fontSize:'13px'}
    },
    {
        key: 5,
        text: 'Claimswap',
        value: 'Claimswap',
        image: { avatar: true, src: icons["Claimswap"] },
        style: { fontSize:'13px'}
    },
    {
        key: 6,
        text: 'PALA',
        value: 'PALA',
        image: { avatar: true, src: icons["PALA"] },
        style: { fontSize:'13px'}
    },
    {
        key: 7,
        text: 'Klaymore',
        value: 'Klaymore',
        image: { avatar: true, src: icons["Klaymore"] },
        style: { fontSize:'13px'}
    },
    {
        key: 8,
        text: 'Klaystation',
        value: 'Klaystation',
        image: { avatar: true, src: icons["Klaystation"] },
        style: { fontSize:'13px'}
    },
    {
        key: 9,
        text: 'stakely',
        value: 'stakely',
        image: { avatar: true, src: icons["stakely"] },
        style: { fontSize:'13px'}
    }
      
]

const lowHighOption = [
    {
      key: 0,
      text: 'Order By TVL',
      value: 'tvl',
      style: { fontSize:'13px'}

    },
    {
    key: 1,
    text: 'Order By APR',
    value: 'apr',
    style: { fontSize:'13px'}
    }  
]

const typeOption = [
    {
      key: 0,
      text: 'stable-only',
      value: 'stableOnly',
      style: { fontSize:'13px'}
    },
    {
    key: 1,
    text: 'KLAY-only',
    value: 'klayOnly',
    style: { fontSize:'13px'}
    }  
]

const tokenOption = [
    {
      key: 0,
      text: 'KLAY',
      value: 'KLAY',
      image: { avatar: true, src: icons["KLAY"] },
      style: { fontSize:'13px'}
    },
    {
        key: 1,
        text: 'oUSDT',
        value: 'oUSDT',
        image: { avatar: true, src: icons["oUSDT"] },
        style: { fontSize:'13px'}
    },
    {
        key: 1,
        text: 'oUSDC',
        value: 'oUSDC',
        image: { avatar: true, src: icons["oUSDC"] },
        style: { fontSize:'13px'}
    }  
]


function Filterbox() {

  const { filter, setFilter } = useContext(PoolContext);

  const handleProjOnChange = (e, data) => {
    console.log(data.value);
    setFilter({
        ...filter,
        project : data.value
    })
  }

  const handleOrderOnChange = (e, data) => {
    console.log(data.value);
    setFilter({
        ...filter,
        order : data.value
    })
  }

  const handleTypeOnChange = (e, data) => {
    console.log(data.value);
    setFilter({
        ...filter,
        type : data.value
    })
  }

  const handleTokenOnChange = (e, data) => {
    console.log(data.value);
    setFilter({
        ...filter,
        token : data.value
    })
  }

//   const { activeIndex } = 0;

//   handleClick = (e, titleProps) => {
//     const { index } = titleProps
//     const { activeIndex } = this.state
//     const newIndex = activeIndex === index ? -1 : index

//     this.setState({ activeIndex: newIndex })
//   }


  return (
    <>

<Example />
    {/* <TodoTemplateBlock>
        <div style={{fontSize:"15px", marginBottom:"10px", marginTop:"5px"}}>Filter</div>
        <Dropbox>
            <Dropdown 
                onChange={handleProjOnChange}
                placeholder='Project'
                clearable
                options={projectOptions}
                selection
                style={{fontSize:"13px"}}
            />
            <Dropdown 
                onChange={handleTokenOnChange}
                placeholder='Staking Token'
                clearable 
                options={tokenOption}
                selection 
                style={{fontSize:"13px"}}
            />                
            <Dropdown 
                onChange={handleTypeOnChange}
                placeholder='Staking type'
                clearable 
                options={typeOption}
                selection
                style={{fontSize:"13px"}}
            />
            <Dropdown
                onChange={handleOrderOnChange}
                placeholder='Order by TVL'
                compact
                selection
                options={lowHighOption}
                style={{fontSize:"13px"}}
            />
            
        </Dropbox>
    </TodoTemplateBlock> */}
    </>
  );
}

// const SizeForm = (
//     <Form>
//       <Form.Group grouped>
//         <Form.Radio label='Small' name='size' type='radio' value='small' />
//         <Form.Radio label='Medium' name='size' type='radio' value='medium' />
//         <Form.Radio label='Large' name='size' type='radio' value='large' />
//         <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
//       </Form.Group>
//     </Form>
//   )

const Dropbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 500px){
        display: flex;
        flex-direction: column;
        justify-content: space-between; 
        gap: 20px;
        margin-top:20px;   
    }
`

const TodoTemplateBlock = styled.div`
  width: 1024px;
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
  padding-bottom: 20px;
  /* display: flex;
  flex-direction: column; */

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



export default Filterbox;
