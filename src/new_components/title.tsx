import React from "react";
import { Logo } from "./new_title";
import myimage from "../images/title_new2.png";
import { ReactComponent as PurpleLogo } from "../images/SVG/SVG/boldLogo2.svg";
import panelpop from "../images/SVG/panels.svg";
import { Identity, Logout, Authentication } from "./contexts";
// let mylogo = new Image();
// mylogo.src = mylogo;
function TitleBar({setSidePanel, setRecord}) {
  const Id = React.useContext(Identity);
  const logmeout = React.useContext(Logout);
  const isAuth = React.useContext(Authentication);
  console.log("ID I", Id);
  return (
    <div className="title-container">
      <PurpleLogo />
      <div className="panel-pop" style={{backgroundImage:`url(${panelpop})`}} onClick={e=>setSidePanel(s=>!s)}>P</div>
      <div className="panel-choose" onClick={e=>setRecord(r=>!r)}>P</div>
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
