import React from "react";
import { Logo } from "./new_title";
import myimage from "../images/title_new2.png";
import { ReactComponent as PurpleLogo } from "../images/SVG/SVG/boldLogo2.svg";
import panelpop from "../images/SVG/panels.svg";
import screenshare from "../images/SVG/screenshare.svg";
import {toolTipSetter} from '../utils/tooltipsetter'
import { Identity, Logout, Authentication, TooltipSetter } from "./contexts";
// let mylogo = new Image();
// mylogo.src = mylogo;
function TitleBar({setSidePanel, setRecord, setPendingFloat, shouldRecord}) {
  const Id = React.useContext(Identity);
  const setTooltip = React.useContext(TooltipSetter);
  const logmeout = React.useContext(Logout);
  const isAuth = React.useContext(Authentication);
  console.log("ID I", Id);
  return (
    <div className="title-container"  >
      <PurpleLogo />
      <div className="panel-pop" style={{backgroundImage:`url(${panelpop})`}} onClick={e=>setSidePanel(s=>!s)}>P</div>
      <div className="panel-pop" style={{backgroundImage:`url(${panelpop})`}} onClick={e=>setPendingFloat(s=>!s)}>P</div>
      <div 
        // onMouseEnter={(e) => {
        //   toolTipSetter(e, setTooltip, "Toggle Video Record mode", true);
        // }}
        // onMouseLeave={(e) => {
        //   toolTipSetter(e, setTooltip, "Toggle Video Record mode", false);
        // }}
      
      
      className="panel-choose" style={{backgroundImage:`url(${screenshare})`, border:shouldRecord?"5px solid #fd9741":"5px solid white"}} onClick={e=>setRecord(r=>!r)}></div>
      <div className="log-info">
        <div className="greeting">
          welcome, {Id?.profile?.given_name || "guest"}
        </div>
        {isAuth ? <button onClick={logmeout}>Logout</button> : null}
      </div>
    </div>
  );
}

export { TitleBar };
