import React, { useEffect, createElement, useState } from "react";
import { XHRNew } from "../../network_functions/XHRNew";

export function UploadingListItem({ status, item, url, user, key, dispatch }) {
  console.log("arr name", item);
  console.log("STATUS", status);
  const [progress, setprogress] = useState(item.progress);
  useEffect(function () {
    XHRNew(item.file, `${url}/${item.id}?username=${user}`, setprogress);
    
  }, []);
  useEffect(function () {
    if(progress===100){
      dispatch({type:"COMPLETED", action:item.id})
    }
    
  }, [progress]);

  switch (status) {
    case "active":
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
                  progress === "100" || progress === 100
                    ? "green"
                    : "orangered",
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
    case "completed":
      return <div key={item.id}>completed</div>;
    case "pending":
      return <div key={item.id}>waiting</div>;
    default:
      return <div key={item.id}>nothing</div>;
  }
}
