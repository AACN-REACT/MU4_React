import * as React from "react";
import { Logo } from "./new_title";
import myimage from "../images/title_new2.png";

let mylogo = new Image();
mylogo.src = myimage;
function TitleBar() {
  return (
    <div className="title-container">
      <img src={myimage} />
    </div>
  );
}

export { TitleBar };
