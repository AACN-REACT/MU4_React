import * as React from "react";
import {MediaList} from './medialist'

import { Paginate } from "../utils/sorting_algorithms";

export function MediaListContainer({ mediaKey, setMediaKey, list, fetchListToggle }) {
  const [mediaList, setMediaList] = React.useState(
    new Array(10).fill("loader")
  );
  const [pageNumber, setPageNumber] = React.useState(0);

  React.useEffect(function () {
    setMediaList(Paginate(list,10));
  },[list]);
  console.log("List to display",mediaList[pageNumber])
  return (
    <div className="medialist-container">
        <div>page {pageNumber+1} of {mediaList.length}</div>
        <button onClick={e=>{fetchListToggle(s=>!s)}}>Refresh</button><button onClick={e=>{pageNumber<mediaList.length-1?setPageNumber(p=>p+1):null}}>next page</button>
        <MediaList pageNumber={pageNumber} list={mediaList[pageNumber]} />
    </div>
  );
}
