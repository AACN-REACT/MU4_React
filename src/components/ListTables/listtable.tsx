import * as React from "react";

import { UploadingListItem } from "./listitems";

export function UploadTable({ list, url, user, dispatch }) {
  //create a list from the list
  console.log("LIST OBJECT", list);
  let arr = [];
  for (let i in list) {
    console.log("arr 1", i);
    arr.push({ ...list[i] });
  }
  console.log("arr", arr);
  if(arr.length>0){
  return (
    <div className="upload-container">
      <div className="title-box">Uploading...</div>
      {arr.map((item) => (
        <UploadingListItem  dispatch={dispatch} key={item.id} item={item} url={url} user={user} />
      ))}
    </div>
  );
      }
    return null
}
