import React from "react";

export function Switch({ dispatchPanelState, panelState }) {




    return (
    <div className={panelState===0?"switch-container":"switch-container-open"} onClick={(e) => {
        panelState === 0
          ? dispatchPanelState({ type: "OPEN UPLOAD" })
          : dispatchPanelState({ type: "CLOSE UPLOAD" });
      }}>
        <div className={panelState===0?"switch-light":"switch-light-open"}>
            <div className={panelState===0?"switch":"switch-open"} onMouseDown={e=>{}} ></div>
        </div>
    </div>
  );
}
