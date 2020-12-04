import React from "react";

export function ErrorToast({msg=void 0, close}) {




  return (
    <div
      onClick={(e) => {
        close(null);
      }}
      className={`error ${msg ? "error-open" : ""}`}

      style={msg?{top:`${window.scrollY}px`}:null}
    >
      {msg}
    </div>
  );
}
