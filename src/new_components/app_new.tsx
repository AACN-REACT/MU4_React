import * as React from "react";
import { Auth } from "./auth_new";
import {Dummy} from "./dummy"
import { Panels } from "./panels";
import {TitleBar} from './title'


export function App() {
  return (
    <Auth idserver="aacn" flow="PKCE" config={{}}>
        <TitleBar/>
        <Panels>
      <Dummy msg="hello world" />
      <Dummy msg="hello world" />

        </Panels>
    </Auth>
  );
}
