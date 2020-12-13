import React from "react";

import { ListPage } from "./ListStructure";
import { ListMediaItem } from "./list-media-item";

function Page({ items, mypos }) {
  return (
    <div key={mypos} style={{ left: `${mypos}px` }}>
      {items.map((el) => (
        <div key={el.Key}>{el.Key})</div>
      ))}
    </div>
  );
}

function extractThreePages(list = [], pageNumber = 0) {
  if (pageNumber === 0) {
    return [list[0], list[1]];
  } else if (pageNumber === list.length - 1) {
    return [list[pageNumber - 2], list[pageNumber - 1]];
  } else {
    return [list[pageNumber - 1], list[pageNumber], list[pageNumber + 1]];
  }
}

function pagePosition(arr, ind, posOfParent) {}

export function ManagementList({
  changePageNumber,
  pageNumber,
  panelStateNumber,
  list,
  pos,
  setMediaKey,
  dispatchPanelState,
  mediaItem,
}) {
  let myPos = React.useRef();

  return (
    <div
      onWheel={(e) => {
        console.log(e.deltaY);
        if (e.deltaY > 20 && pageNumber != 0) {
          changePageNumber((p) => p - 1);
        } else if (e.deltaY < -20) {
          changePageNumber((p) => p + 1);
        }
      }}
      ref={myPos}
      style={{ position: "relative", left: `${pageNumber * 100}%` }}
    >
      {list?.map((el) => (
        <ListMediaItem
          mediaItem={el}
          setMediaKey={setMediaKey}
          dispatchPanelState={dispatchPanelState}
          panelStateNumber={panelStateNumber}
        />
      ))}
    </div>
  );
}
