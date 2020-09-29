import * as React from "react";
import { DropZone } from "../components/dropzone/dropzoneOLD";
import { DropzoneContainer } from "./dropzone_container";
import { Auth } from "./auth_new";
import { CompletedList } from "./completed_list";
import { DetailsPage } from "./details_page";
import { Dummy } from "./dummy";
import { Panels } from "./panels";
import { PendingList } from  "./pending_list"
import { TitleBar } from "./title";
import {videolist} from '../data/videolist'
export function App() {
  return (
    <Auth idserver="aacn" flow="PKCE" config={{}}>
      <TitleBar />
      <Panels>
        <Dummy msg="hello world" />
        <PendingList />
        <DropzoneContainer/>
        <CompletedList videolist={videolist} val="hello" />
        <DetailsPage/>
      </Panels>
    </Auth>
  );
}
