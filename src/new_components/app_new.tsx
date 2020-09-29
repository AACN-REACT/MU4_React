import * as React from "react";
import { DropZone } from "../components/dropzone/dropzoneOLD";
import { Auth } from "./auth_new";
import { CompletedList } from "./completed_list";
import { DetailsPage } from "./details_page";
import { Dummy } from "./dummy";
import { Panels } from "./panels";
import { PendingList } from  "./pending_list"
import { TitleBar } from "./title";

export function App() {
  return (
    <Auth idserver="aacn" flow="PKCE" config={{}}>
      <TitleBar />
      <Panels>
        <Dummy msg="hello world" />
        <PendingList />
        <DropZone/>
        <CompletedList />
        <DetailsPage/>
      </Panels>
    </Auth>
  );
}
