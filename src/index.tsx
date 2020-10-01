import * as React from "react";
import { render } from "react-dom";
//import { Client } from './network_functions/video_management_client'
//styles

// vimeo client id 6c5f8d136d95d91a71b0ebf678c1bef1455d1eff

//import "./styles/main.scss";
import "./styles/newstyles/main_new.scss";
//components

//import

//import App from "./components/app2";

import { App } from "./new_components/app_new";

const user = "akhan";
const uploadURL = "https://localhost:44390/api/v1/Medias";
const sizeLimit = 45000000;

const root = document.querySelector("#root");

render(<App uploadURL={uploadURL} user={user} />, root);
