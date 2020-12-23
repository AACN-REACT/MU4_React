import React from "react";
import { Controls } from "./controls";
import { ControlButton } from "./control_button";
import { EditableField } from "./edit_field";
import { KeywordEditableField } from "./edit_field_Keywords";
import { NetforumEditableField } from "./edit_field_netforum";
import { NonEditableField } from "./non_edit_field";
import { OpenLogs } from "./open-logs";
import butt from "../images/switch.png";
import { DeleteButton } from "./delete_button";
import { FinalizeButton } from "./finalize_button";
import { Identity, RefreshList, ErrorHandler } from "./contexts";
import { CatchNetworkError } from "../utils/catchNetworkError";
import { Switch } from "./switch-details";
import { DetailsContents } from "./details_contents";
import { NewWindow } from "./new_window";

export function DetailsPage({
  mediaKey,
  panelState,
  dispatchPanelState,
  isLoading,
  refreshList,
}) {
  const [mediaDetails, setMediaDetails] = React.useState(null);
  const [toggle, refetchData] = React.useState(false);
  const identity = React.useContext(Identity);
  const setErrorMsg = React.useContext(ErrorHandler);
  const [isDetailsLoading, setDetailsLoading] = React.useState(isLoading);

  //const [emptyPresentation, setEmptyPresentation] = React.useSate(false);

  const [
    arrayOfFloatingDetailsPages,
    setArrayOfFloatingDetailsPages,
  ] = React.useState(new Array());
  console.log("MEDIA ", mediaDetails, mediaKey);

  const netForumDisplayData = mediaDetails?.NetforumLink
    ? mediaDetails.NetforumLink
    : "";
  console.log("Netforum Data-- ", netForumDisplayData);
  console.log("ARRAY", arrayOfFloatingDetailsPages);

  React.useEffect(
    function () {
         let localtoken = false;
      if (localStorage.getItem("mediakey")) {
        localtoken = localStorage.getItem("mytoken") || false;

        //localStorage.removeItem("mediakey");
      }
      let isMounted = true;
      setDetailsLoading(true);
      if(mediaKey){
      fetch(
        `https://localhost:44340/api/v1/Medias/${mediaKey}/MediaDetailsVm`,
        {
          headers: {
            Authorization: `Bearer ${identity.access_token}`,
          },
        }
      )
      .then((res) => CatchNetworkError.call(null, res, setErrorMsg))
      .then((res) => {
          if (isMounted) {
            localStorage.removeItem("mediakey");
            return res;
          }
        })
        .then((res) => {
        setMediaDetails(res["Result"]);
          setDetailsLoading(false);
        })
      }
        // .catch(err=>{
        //     setErrorMsg(err.message)
        // })

      return () => {
        isMounted = false;
      };
    },
    [mediaKey, identity, toggle]
  );
  return (
    <>
  <DetailsContents
        mediaKey={mediaKey}
        errorHandler={ErrorHandler}
        panelState={panelState}
        dispatchPanelState={dispatchPanelState}
        refreshList={refreshList}
        identity={identity}
        mediaDetails={mediaDetails}
        setErrorMsg={setErrorMsg}
        close={close}
        refetchData={refetchData}
        toggle={toggle}
        isDetailsLoading={isDetailsLoading}
        setDetailsLoading={setDetailsLoading}
        setMediaDetails={setMediaDetails}

        setArrayOfFloatingDetailsPages={setArrayOfFloatingDetailsPages}
      />
    </>
  );
}
