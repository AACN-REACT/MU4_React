import React from "react";

export function ErrorToast({msg=void 0, close}) {


console.log('[[[[ TOAST', msg, 'close', close)

  return (
    <div
      onClick={(e) => {
        close(null);
      }}
      className={`error ${msg ? "error-open" : ""}`}

      style={msg?{top:`${window.scrollY}px`}:null}
    >
      <div className="error-heading">Error</div>
      <div className="error-message">{msg}</div>
    
    </div>
  );
}
