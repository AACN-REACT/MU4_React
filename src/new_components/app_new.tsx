import * as React from "react";
import { DropZone } from "../components/dropzone/dropzoneOLD";
import { DropzoneContainer } from "./dropzone_container";
import { Auth } from "./auth_new";
import { CompletedList } from "./completed_list";
import { DetailsPage } from "./details_page";
import { Dummy } from "./dummy";
import { Panels } from "./panels";
import { PendingList } from "./pending_list";
import { ListComponent } from "./list-component";
import { TitleBar } from "./title";
import {Tooltip} from  './tooltip';
import { UploadTable } from "../components/ListTables/listtable";
import { videolist } from "../data/videolist";
import { uploadListReducer } from "../utils/reducers/upload-list-reducer";
import { Client } from "../network_functions/swaggerclient/swaggerclient";

/*-------------------------------------------------------------------------------------------------------*/
// our App component starts here, takes uploadUrl and user at this point - perhaps should include uploadlimit?
export function App({ uploadURL, user, sizeLimit }) {
  /* since we are defiing our components at the top level its important that we set up the uploading state and dispatcher here so we can 
pass them directly down to the sibling components, utilises the uploadListReducer - see there for logic */
  const [uploadSTATE, DISPATCHUpload] = React.useReducer(uploadListReducer, {});
  /*-------------------------------------------------------------------------------------------------------*/
  /*Now we set up state for a an error and error message */
  const [ErrorMsg, setErrorMsg] = React.useState(null)
  
  
  /*Now we set up state for a tooltip */
  const [toolTip, setTooltip]  = React.useState(null)
  
  
  
  
  /*-------------------------------------------------------------------------------------------------------*/
  /* this initial value is too check if we have a key value in the url params, so that we can use it to
load an initial details page. This is required if we are to allow copy and pasting of urls to specific details pages
0Auth may interfer with this so an alternative is to put it into browser storage and check for it on any return from 
the Auth server - not implemented yet
*/
  const idTakenFromUrl = React.useMemo(function () {
    let url = new URL(window.location.href);
    if (url.searchParams.get("key")) {
      return url.searchParams.get("key");
    }
    return null;
  }, []);

  /*-------------------------------------------------------------------------------------------------------*/
  /* we make our initial request for the media management details here, this may change depending on how
we implement 0Auth, since the api will be protected and we will need a token 

this needs to changed into a custome hook: */

  const [[pendingList, finalizedList], setManagementLists] = React.useState([
    [],
    [],
  ]);

  const [mediaKey, setMediaKey] = React.useState(null);
  const v0 = "https://localhost:44390/api/v0/MediaManagement";
  const v1 = "https://localhost:44340/api/v1/MediaManagement";
  const localJson = "http://localhost:3000/Result";
  React.useEffect(function () {
    fetch(v1)
      .then((res) => res.json())
      .then((res) => {
        console.log("RES", res);
        let completed = res["Result"]["FinalizedMediaDetailsDtos"];
        let pending = res["Result"]["PendingMediaDetailsDtos"];
        console.log("completed", completed);
        setManagementLists([pending, completed]);
      });
  }, []);

  /*--------------------------------------------------------------------------------------------------------*/
  return (
    <Auth idserver="aacn" flow="PKCE" config={{}}>
      <Tooltip toolTip={toolTip} />
      <div>{ErrorMsg}</div>
      <TitleBar />
      <Panels>
        <UploadTable
          setMediaKey={setMediaKey}
          list={uploadSTATE}
          url={uploadURL}
          dispatch={DISPATCHUpload}
          user={user}
          setError={setErrorMsg}
        />
        <ListComponent
          heading="Pending"
          videolist={pendingList}
          setMediaKey={setMediaKey}
         
        />
        <DropzoneContainer
          uploadSTATE={uploadSTATE}
          DISPATCHUpload={DISPATCHUpload}
          sizeLimit ={sizeLimit}
          setError={setErrorMsg}
          
        />
        <ListComponent
          heading="Completed"
          videolist={finalizedList}
          setMediaKey={setMediaKey}
        />
        <DetailsPage mediaKey={mediaKey} />
      </Panels>
    </Auth>
  );
}
