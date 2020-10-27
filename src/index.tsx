import * as React from "react";
import { render } from "react-dom";
//import "./styles/main.scss";
import "./styles/newstyles/main_new.scss";
//components


//import

//import App from "./components/app2";
import { App } from "./new_components/app_new";


const user = "akhan";
const uploadOrigin = "https://localhost:44340";
const sizeLimit = 45000000;

const root = document.querySelector("#root");

render(<App uploadOrigin={uploadOrigin} user={user} sizeLimit={sizeLimit} />, root);
