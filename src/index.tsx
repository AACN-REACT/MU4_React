import React from "react";
import { render } from "react-dom";

import "./styles/newstyles/main_new.scss";

import { App } from "./new_components/app_new";

//import { App } from "./mediauploader/app";

const user = "akhan";
const uploadOrigin = "https://localhost:44340";
const sizeLimit = 45000000;

const root = document.querySelector("#root");

render(
  <App uploadOrigin={uploadOrigin} user={user} sizeLimit={sizeLimit} />,
  root
);
