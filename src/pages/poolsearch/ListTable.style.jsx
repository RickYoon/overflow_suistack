import Styled, { keyframes } from 'styled-components';


export const Tdpd = Styled.td`
  &:hover {
    text-decoration:underline;
    color:#3366cc;
  }
  cursor: pointer;
  height:25px;
  vertical-align:middle;
  width: 400px;
  padding-left: 2em;
  @media screen and (max-width: 500px){
    padding-left: 10px;
    font-size:13px;
    width: 1000px;
  }
`

export const P = Styled.p`
  text-align: left !important;
`

export const Table = Styled.table`
  /* margin: 20px; */
  /* width: 100%; */
`

export const TrHead = Styled.tr`
  height: 40px;
  border-bottom: 2px solid black;
`

export const Th = Styled.th`
  height: 25px;
  width: 30px;
  text-align: left;
  vertical-align:middle;
  padding-left:5px;
  white-space: nowrap;
  
`;

export const Td = Styled.td`
  vertical-align:middle;
  width: ${props => props.width || "200px"};
  text-align:  ${props => props.textAlign || ""};
`

export const Tdc = Styled.td`
  @media screen and (max-width: 500px){
    display:none;
  }
  vertical-align:middle;
  width: ${props => props.width || "200px"};
  text-align:  ${props => props.textAlign || ""};
`;

export const Tdp = Styled.td`
  vertical-align:middle;
  width: 400px;
  padding-left: 2em;
  
  @media screen and (max-width: 500px){
    padding-left: 1em;
    width: 250px;
  }
`



export const TodoTemplateBlock = Styled.div`
  width: 788px;
  /* max-height: 1024px; */

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 1px 1px 1px gray;

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 16px;
  margin-bottom: 5px;
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
    width: 100%;
    padding-left:0px;
    padding-right:0px;
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
    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

    margin-top: 16px;
    margin-bottom: 5px;

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

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = Styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;


export const IconSkeleton = Styled.div`
  display: inline-block;
  height: 25px;
  width: 25px;
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
  margin-top: ${props => props.marginTop || "0"}
`;
