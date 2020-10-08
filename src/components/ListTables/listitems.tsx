import React, { useEffect, createElement, useState } from "react";
import { XHRNew } from "../../network_functions/XHRNew";

export function UploadingListItem({
  setMediaKey,
  dispatchPanelState,
  status,
  item,
  url,
  user,
  key,
  dispatch,
}) {
  console.log("arr name", item);
  console.log("STATUS", status);
  const [progress, setprogress] = useState(item.progress);
  let [returnedXhr, setReturnedXhr] = useState({ abort: () => null });
  useEffect(function () {
    if (status === "active") {
      setReturnedXhr(
        XHRNew(
          item,
          `${url}/${item.id}?username=${user}`,
          setprogress,
          dispatch
        )
      );
    } else if (status === "completed") {
      setprogress(100);
    }
  }, []);
  React.useEffect(
    function () {
      if (progress === 100) {
        dispatch({ type: "COMPLETED", action: item.id });
      }
    },
    [progress]
  );
  let container = React.useRef();
  switch (status) {
    case "active":
      return (
        <div
          ref={container}
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
              returnedXhr.abort();
              dispatch({ type: "DELETE", action: item.id });
            }}
            className="close-box"
          >
            {item.edit ? "o" : "x"}
          </div>
        </div>
      );
    case "completed":
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
    case "pending":
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
    case "canedit":
      return (
        <div
          key={key}
          onClick={(e) => {
            setMediaKey(item.id);
            dispatchPanelState({
              type: "OPEN DETAILS OPEN UPLOAD CLOSE OTHERS",
            });
          }}
          className={`upload-list-item ${progress === 100 ? "EDIT" : ""}`}
        >
          <div className="name-box">{item.name}</div>
          <div className="type-box">{item.type}</div>
          <div className="size-box">{item.size}</div>
          <div className="progress-box">
            <div
              style={{
                transition: ".5s all",
                color: "white",
                backgroundColor: "green",
                width: "100%",
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
    default:
      return null;
  }
}
