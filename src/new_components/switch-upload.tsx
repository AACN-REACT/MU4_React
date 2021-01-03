import React from "react";
import {toolTipSetter} from '../utils/tooltipsetter'
import {TooltipSetter } from "./contexts";
export function Switch({ dispatchPanelState, panelState }) {

 const {setTooltip} = React.useContext(TooltipSetter);


    return (
    <div className={panelState===0?"switch-container":"switch-container-open"} 
    onMouseEnter={(e) => {
      toolTipSetter(e, setTooltip, "Click to open all columns", true);
    }}
    onMouseLeave={(e) => {
      toolTipSetter(e, setTooltip, "Click to close", false);
    }}
    
    
    onClick={(e) => {
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
