import * as React from "react";

import { UploadingListItem } from "./listitems_new";

export function UploadTable({ list, url, user, dispatch, dispatchPanelState }) {
  //create a list from the list
  console.log("LIST OBJECT", list);

  let arr = [];
  let activelist = [],
    completedlist = [],
    editablelist = [],
    pendinglist = [];
  for (let i in list) {
    console.log("arr 1", list);
    arr.push({ ...list[i] });
  }
  activelist = arr.filter((item, ind, arr) => item.status === "active");
  completedlist = arr.filter((item, ind, arr) => item.status === "completed");
  editablelist = arr.filter((item, ind, arr) => item.status === "canedit");
  pendinglist = arr.filter((item, ind, list) => item.status === "pending");
  React.useEffect(
    function () {
      if (arr.length > 0) {
        console.log("hello");
    
        console.log(
          "arr",
          arr,
          "\n pending",
          pendinglist,
          " active",
          activelist,
          "\n completed",
          completedlist
        );
        if (activelist.length < 2) {
          if (pendinglist.length > 0) {
            dispatch({ type: "ACTIVE", action: pendinglist[0].id });
          }
        }
      }
      return (arr) => null;
    },
    [activelist]
  );

  if (arr.length > 0) {
    return (
      <div className="upload-container">
        
        <div className="active">
          {activelist.map((item) => (
            <UploadingListItem
              status={item.status}
              dispatch={dispatch}
              key={item.id}
              item={item}
              url={url}
              user={user}
            />
          ))}
        </div>
        <div className="pending">
          {pendinglist.map((item) => (
            <UploadingListItem
              status={item.status}
              dispatch={dispatch}
              key={item.id}
              item={item}
              url={url}
              user={user}
            />
          ))}
        </div>
        <div className="completed">
          {completedlist.map((item) => (
            <UploadingListItem
              status={item.status}
              dispatch={dispatch}
              key={item.id}
              item={item}
              url={url}
              user={user}
            />
          ))}
        </div>
        <div className="canedit">
          {editablelist.map((item) => (
            <UploadingListItem
              status={item.status}
              dispatch={dispatch}
              key={item.id}
              item={item}
              url={url}
              user={user}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
