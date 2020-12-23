import React from "react";

export function Switch({floatInfo, dispatchPanelState, panelStateNumber, heading }) {




    return (
    <div className={panelStateNumber ===0?"switch-container":"switch-container-open"} onClick={(e) => {
      dispatchPanelState({
        type:
          panelStateNumber === 0 || panelStateNumber === 2
            ? "OPEN PARTIAL"
            : `OPEN ${heading.toUpperCase()}`,
      });
    }}>
        <div className={panelStateNumber===1?"switch-light":"switch-light-open"}>
            <div className={panelStateNumber===1?"switch":"switch-open"}  ></div>
        </div>
    </div>
  );
}
