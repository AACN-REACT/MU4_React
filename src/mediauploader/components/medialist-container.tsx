import * as React from "react";
import { MediaList } from "./medialist";

import { Paginate } from "../utils/sorting_algorithms";

export function MediaListContainer({
  mediaKey,
  setMediaKey,
  list,
  fetchListToggle,
}) {
  const [mediaList, setMediaList] = React.useState(
   list
  );
  const [pageNumber, setPageNumber] = React.useState(0);

  React.useEffect(
    function () {
      console.log("paginated", setMediaList(Paginate(list, 10)));
      if(list!=="loading" || list!=="idle") setMediaList(Paginate(list, 10));
    },
    [list]
  );

  const listState = Array.isArray(list);
  return (
    <div className="medialist-container">
      <div>
        page {pageNumber + 1} of {mediaList.length}
      </div>
      <button
        disabled={pageNumber < 1}
        onClick={(e) => {
          pageNumber > -1 ? setPageNumber((p) => p - 1) : null;
        }}
      >
        previous page
      </button>{" "}
      <button
        onClick={(e) => {
          setPageNumber(0)
          fetchListToggle((s) => !s);
        }}
      >
        Refresh
      </button>
      <button
        onClick={(e) => {
          pageNumber < mediaList.length - 1
            ? setPageNumber((p) => p + 1)
            : null;
        }}
      >
        next page
      </button>
      <MediaList pageNumber={pageNumber} list={listState?mediaList[pageNumber]:mediaList} />
    </div>
  );
}
