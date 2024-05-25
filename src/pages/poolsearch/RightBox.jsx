import React, {useContext} from "react";
import { PoolContext } from "../../component/context/PoolContext"
import TvlGainerCard from "./component/TvlGainerCard"
import TvlLoserCard from "./component/TvlLoserCard"
// import TokenGainerCard from "./component/TokenGainerCard";
// import EventCard from "./component/EventCard"
// import TwitterCard from "./component/TwitterCard"
// import SubmitEvent from "./component/SubmitEvent"
// import EventBanner from "./component/EventBanner"

function RightBox() {

  const { filter, pooldata, isloading } = useContext(PoolContext);

  return (
    <>
      {/* <TvlGainerCard data={toptvl} isLoading={isloading}/> */}
      <TvlGainerCard data={pooldata} isLoading={isloading} filter={filter}/>
      <div style={{marginTop:"15px"}}></div>

      <TvlLoserCard data={pooldata} isLoading={isloading} filter={filter}/>


      {/* <EventBanner /> */}
      

    </>
  );
}



export default RightBox;
  