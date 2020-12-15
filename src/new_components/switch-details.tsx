import React from "react";

export function Switch({ dispatchPanelState, panelState}) {




    return (
    <div className={panelState.details_container ===0?"switch-container":"switch-container-open"}   >
        <div className={panelState.details_container===0?"switch-light":"switch-light-open"}>
            <div className={panelState.details_container===0?"switch":"switch-open"}  ></div>
        </div>
    </div>
  );
}
