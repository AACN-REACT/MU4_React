import * as React from "react";

import { UploadingListItem } from "./listitems";

export function UploadTable({ list, url, user, dispatch }) {
  //create a list from the list
  console.log("LIST OBJECT", list);

  let arr = [];
  let activelist=[], completedlist=[], pendinglist=[];
  for (let i in list) {
    console.log("arr 1", list);
    arr.push({ ...list[i] });
  }
  activelist = arr.filter((item, ind, arr) => item.status === "active");
  completedlist = arr.filter((item, ind, arr) => item.status === "completed");
  pendinglist = arr.filter((item, ind, list) => item.status === "pending");
  React.useEffect(
    function(){
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
  return ()=>null
},[activelist]
  )

  if (arr.length > 0) {
    return (
      <div className="upload-container">
        <div className="title-box">Uploading...</div>
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
    );
  }

  return null;
}
