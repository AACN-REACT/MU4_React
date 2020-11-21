import React from "react";
import { Logo } from "./new_title";
import myimage from "../images/title_new2.png";
import { ReactComponent as PurpleLogo } from "../images/SVG/SVG/muLogo.svg";
import { Identity, Logout, Authentication } from "./contexts";
// let mylogo = new Image();
// mylogo.src = mylogo;
function TitleBar(user) {
  const Id = React.useContext(Identity);
  const logmeout = React.useContext(Logout);
  const isAuth = React.useContext(Authentication);
  console.log("ID I", Id);
  return (
    <div className="title-container">
      <PurpleLogo />
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
