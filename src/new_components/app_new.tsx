import React from "react";
import { DropZone } from "../components/dropzone/dropzoneOLD";
import { aacn, pkce, pkcetls } from "../data/identity-config";
import { DropzoneContainer } from "./dropzone_container";
import { useAuth } from "../utils/custom_hooks/useauth";
import { CompletedList } from "./completed_list";
import { DetailsPage } from "./details_page";
import { Dummy } from "./dummy";
import { Panels } from "./panels";
import { PendingList } from "./pending_list";
// import { ListComponent } from "./list-component";
import { ListComponent } from "./new_list_component";
import { TitleBar } from "./title";
import { Tooltip } from "./tooltip";
import { ErrorToast } from "./errortoast";
import { UploadTable } from "../components/ListTables/listtable";
import { videolist } from "../data/videolist";
import { uploadListReducer } from "../utils/reducers/upload-list-reducer";
import { Client } from "../network_functions/swaggerclient/swaggerclient";
import {CatchNetworkError} from '../utils/catchNetworkError'
import {
  sortNewestDate,
  sortOldestDate,
  sortTitle,
  sortFileSize,
} from "../utils/sorting/sorting_algorithms";
import { Levenshtein } from "../utils/sorting/levenshtein";
import { EndpointConstructor } from "../mediauploader/utils/endpoint_constructor";
import {
  Authentication,
  Identity,
  Logout,
  Endpoint,
  ErrorHandler,
} from "./contexts";

import { GlobalContext } from "./contexts";
import { SetErrorMsg } from "../mediauploader/components/globalstateContext";
function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return JSON.parse(result).error;
}


const mediaManagement = new EndpointConstructor({
  origin: "https://localhost:44340",
  version: 1,
  name: "MediaManagement",
});

/*-------------------------------------------------------------------------------------------------------*/
// our App component starts here, takes uploadUrl and user at this point - perhaps should include uploadlimit?
export function App({ uploadOrigin, user, sizeLimit }) {
  /* since we are defiing our components at the top level its important that we set up the uploading state and dispatcher here so we can 
pass them directly down to the sibling components, utilises the uploadListReducer - see there for logic */

  let searchParams = React.useMemo(() => {
    return new URL(window.location.href).searchParams;
  }, [window.location.href]);

  const [uploadSTATE, DISPATCHUpload] = React.useReducer(uploadListReducer, {});
  /*-------------------------------------------------------------------------------------------------------*/
  /*Now we set up state for a an error and error message */
  const [ErrorMsg, setErrorMsg] = React.useState(
    searchParams.has("error") ? searchParams.get("error") : null
  );

  /*Now we set up state for a tooltip */
  const [toolTip, setTooltip] = React.useState(null);

  /*-------------------------------------------------------------------------------------------------------*/
  /* this initial value is too check if we have a key value in the url params, so that we can use it to
load an initial details page. This is required if we are to allow copy and pasting of urls to specific details pages
0Auth may interfer with this so an alternative is to put it into browser storage and check for it on any return from 
the Auth server - not implemented yet
*/

  const idTakenFromUrl = React.useMemo(
    function () {
      if (searchParams.get("mediakey")?.length > 0) {
        let tempMediaKey = searchParams.get("mediakey");
        localStorage.setItem("mediakey", tempMediaKey);
        return tempMediaKey;
      } else {
        return localStorage.getItem("mediakey");
      }
    },
    [searchParams, window.location.href]
  );
  console.log("LLLL", idTakenFromUrl);
  /*-------------------------------------------------------------------------------------------------------*/
  /* we make our initial request for the media management details here, this may change depending on how
we implement 0Auth, since the api will be protected and we will need a token 

this needs to changed into a custome hook: */
  const [identity, isAuthenticated, logout] = useAuth(pkcetls);
  const [[pendingList, finalizedList], setManagementLists] = React.useState([
    [],
    [],
  ]);

  const [mediaKey, setMediaKey] = React.useState(idTakenFromUrl);
  console.log(">> mediakey", mediaKey);
  const v0 = "https://localhost:44390/api/v0/MediaManagement";
  const uploadURL = uploadOrigin + "/api/v1/MediaManagement";
  const localJson = "http://localhost:3000/Result";

  const [refreshToggle, refreshList] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(
    function () {
      setLoading(true);
      if (isAuthenticated) {
        mediaManagement
          .fetchMainList(identity.access_token)
          .then((res) => CatchNetworkError.call(null, res, setErrorMsg))
          .then((res) => {
            console.log("RES", res);
            let completed = res["Result"]["FinalizedMediaDetailsDtos"];
            let pending = res["Result"]["PendingMediaDetailsDtos"];

            console.log("completed", pending);
            setManagementLists([pending, completed]);
          })
          .then(function () {
            setLoading((l) => false);
  
          })
          .catch((err) => {
            console.log("my error", err);
            setErrorMsg(err.message);
            setLoading((l) => false);
          });
      }
    },
    [identity, isAuthenticated, refreshToggle]
  );

  /*--------------------------------------------------------------------------------------------------------*/
  return (
    <div>
      <GlobalContext
        errorHandler={setErrorMsg}
        identity={identity}
        authentication={isAuthenticated}
        logout={logout}
        endpoint={mediaManagement}
        refreshList={refreshList}
      >
        <Tooltip toolTip={toolTip} />
        <ErrorToast close={setErrorMsg} msg={ErrorMsg} />
        <TitleBar />
        <Panels openDetails={localStorage.getItem("mediakey") || null}>
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
            isLoading={isLoading}
            refreshList={refreshList}
          />
          <DropzoneContainer
            uploadSTATE={uploadSTATE}
            DISPATCHUpload={DISPATCHUpload}
            sizeLimit={sizeLimit}
            setError={setErrorMsg}
          />
          <ListComponent
            heading="Completed"
            videolist={finalizedList}
            setMediaKey={setMediaKey}
            isLoading={isLoading}
          />
          <DetailsPage
            mediaKey={mediaKey}
            refreshList={refreshList}
            isLoading={isLoading}
          />
        </Panels>
      </GlobalContext>
    </div>
  );
}
