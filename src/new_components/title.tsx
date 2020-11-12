import * as React from "react";
import { Logo } from "./new_title";
import myimage from "../images/title_new2.png";
import { Identity,Logout, Authentication } from "./contexts";
let mylogo = new Image();
mylogo.src = myimage;
function TitleBar(user) {
  const Id = React.useContext(Identity);
  const logmeout = React.useContext(Logout)
  const isAuth = React.useContext(Authentication)
  console.log("ID I", Id);
  return (
    <div className="title-container">
      <img src={myimage} />
      <div style={{ color: "black", fontSize: "2rem" }}>
        {Id?.profile?.given_name}
      </div>
      {isAuth?<button onClick={logmeout}>Logout</button>:null}
    </div>
  );
}

export { TitleBar };
