import React from "react";

export function Switch({floatInfo, dispatchPanelState, panelStateNumber, heading, isFloat }) {

 const open = isFloat?`OPEN ${heading.toUpperCase()} FLOAT`:`OPEN ${heading.toUpperCase()}`

 console.log("IS FLOAT",open)

    return (
    <div className={panelStateNumber ===0?"switch-container":"switch-container-open"} onClick={(e) => {
      dispatchPanelState({
        type:
          panelStateNumber === 0 || panelStateNumber === 2
            ? "OPEN PARTIAL"
            : open,
      });
    }}>
        <div className={panelStateNumber===1?"switch-light":"switch-light-open"}>
            <div className={panelStateNumber===1?"switch":"switch-open"}  ></div>
        </div>
    </div>
  );
}
