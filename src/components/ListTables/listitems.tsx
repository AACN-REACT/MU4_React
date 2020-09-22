import React, { useEffect, createElement, useState } from "react";
import { XHRNew } from "../../network_functions/XHRNew";

export function UploadingListItem({ item, url, user, key, dispatch }) {
  console.log("arr name", item);

  const [progress, setprogress] = useState(item.progress);
  useEffect(function () {
    XHRNew(item.file, `${url}/${item.id}?username=${user}`, setprogress);
  }, []);
  return (
    <div
      key={key}
      className={`upload-list-item ${progress === 100 ? "completed" : ""}`}
    >
      <div className="name-box">{item.name}</div>
      <div className="type-box">{item.type}</div>
      <div className="size-box">{item.size}</div>
      <div className="progress-box">
        <div
          style={{
            transition: ".5s all",
            color: "white",
            backgroundColor:
              progress === "100" || progress === 100 ? "green" : "orangered",
            width: `${parseInt(progress)}%`,
          }}
        >{`${parseInt(progress)}%`}</div>
      </div>
      <div
        onClick={(e) => {
          dispatch({ type: "DELETE", action: item.id });
        }}
        className="close-box"
      >
        {item.edit ? "o" : "x"}
      </div>
    </div>
  );
}
