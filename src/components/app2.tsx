import * as React from "react";
import { Uploader2 } from "./uploader2";

import { Title } from "./title/title";
import { UploadContainer } from "./uploadercontainer";
import { Table } from "./table";
import {Triptych} from "./triptych"
import placeholder from "../images/1x/questionJPG.jpg"
// import { ListItem } from "./";
import { useAuth } from "../utils/custom_hooks/useauth";
import { auth0 } from "../data/identity-config";
const settings = { authority: "nothing" };
export default function App() {
  const [identity, isAuthenticated] = useAuth(false);

console.log("PASSED",identity)
    return (
      isAuthenticated?<div >
        <Title
          title="AACN VideoUploader"
          name={identity.profile.name}
          profilePic={identity.profile.picture || placeholder }
        />
        <Triptych>
            <Table token={identity.access_token} heading="Pending" list={[{ one: 1 }]} />
            <UploadContainer
              token={identity.access_token}
              user="akhan"
              uploadURL="https://localhost:44390/api/v1/Medias"
              sizeLimit={45000000}
            />
            <Table token={identity.access_token} heading="Completed" />
        </Triptych>
        
      </div>:<h1>Redirecting to identity server</h1>
    );
  
  

  
}
