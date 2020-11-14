import * as React from "react";

import { Paginate } from "../utils/sorting_algorithms";

export function MediaList({ mediaKey, setMediaKey, list, fetchListToggle }) {
  const [mediaList, setMediaList] = React.useState(
    new Array(10).fill("loader")
  );
  const [pageNumber, setPageNumber] = React.useState(0);
 console.log("LISTS: ", mediaList)
  React.useEffect(function () {
    setMediaList(Paginate(list,10));
  },[list]);

  return (
    <div className="medialist-container">
        <button onClick={e=>{fetchListToggle(s=>!s)}}>Refresh</button>
      {mediaList[0]!=="loader"?mediaList[pageNumber].map((listItem) => (
        <div>{listItem.StartDateTime}</div>
      )):mediaList.map((listItem) => (
        <div>Loading...</div>
      ))
    
    }
    </div>
  );
}
