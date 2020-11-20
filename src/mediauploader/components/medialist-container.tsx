import React from "react";
import { MediaList } from "./medialist";
import { SetToolTip } from "./globalstateContext";
import { Paginate } from "../utils/sorting_algorithms";
import { toolTipSetter } from "../utils/helperfunctions";

export function MediaListContainer({
  mediaKey,
  setMediaKey,
  list,
  fetchListToggle,
}) {
  const [mediaList, setMediaList] = React.useState(list);
  const [pageNumber, setPageNumber] = React.useState(0);

  const setToolTip = React.useContext(SetToolTip);

  React.useEffect(
    function () {
      if (list !== "loading" && list !== "idle") {
        setMediaList(Paginate(list, 10));
      } else {
        setMediaList(list);
      }
    },

    [list]
  );

  const listState = Array.isArray(list);

  console.log("List passes", list, "stete", mediaList);

  return (
    <div className="medialist-container">
      <MediaList
        pageNumber={pageNumber}
        list={typeof mediaList == "object" ? mediaList[pageNumber] : mediaList}
      />
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
          setPageNumber(0);
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
    </div>
  );
}
