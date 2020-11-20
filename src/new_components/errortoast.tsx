import React from "react";

export function ErrorToast(props) {
  return (
    <div
      onClick={(e) => {
        props.close(null);
      }}
      className={`error ${props.msg ? "error-open" : ""}`}
    >
      {props.msg}
    </div>
  );
}
