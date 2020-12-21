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
import {Switch} from './switch-details'
import {NewWindow} from './new_window'

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
  const setErrorMsg= React.useContext(ErrorHandler);
  //const [emptyPresentation, setEmptyPresentation] = React.useSate(false);
  const [isDetailsLoading, setDetailsLoading] = React.useState(isLoading);

  const [arrayOfFloatingDetailsPages, setArrayOfFloatingDetailsPages] = React.setState([])
  console.log("MEDIA ", mediaDetails, mediaKey);
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
const netForumDisplayData = mediaDetails?.NetforumLink?mediaDetails.NetforumLink:""
console.log("Netforum Data-- ", netForumDisplayData)
return (
    <div className="details-page">
      <div className="details-bar">
        <span className="media-details-title">media details...</span>
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            window.open(
              `https://localhost:8080/?mediakey=${mediaKey}`,
              "_blank"
            );
          }}
        >
          <span>Key:</span> {mediaKey}
        </div>
        <div
          onClick={(e) => {
            panelState.details_container === 0
              ? dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" })
              : (function () {
                  refreshList((d) => !d);
                  dispatchPanelState({ type: "CLOSE DETAILS OPEN OTHER" });
                })();
          }}
          src={butt}
        ><Switch dispatchPanelState={dispatchPanelState} panelState={panelState} refreshList={refreshList} /> </div>
      </div>
      <div className="details-frame">
        {mediaDetails?.CanEdit ? (
          <EditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="Title"
            displayName="Title"
            data={mediaDetails?.Title}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="title"
            token={identity.access_token}
            refetchData
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="Title"
            displayName="Title"
            data={mediaDetails?.Title}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user="amin"
            itemKey={mediaDetails?.Key}
            itemName="title"
            token={identity.access_token}
            refetchData
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Added By.."
          data={mediaDetails?.StartedByUsername}
        />
        {mediaDetails?.CanEdit ? (
          <KeywordEditableField
            close={close}
            isDetailsLoading={isDetailsLoading}
            method="POST"
            setter={setMediaDetails}
            name="Keywords"
            displayName="Keywords"
            data={mediaDetails?.Keywords}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="keyword"
            token={identity.access_token}
            refetchData={refetchData}
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="POST"
            setter={setMediaDetails}
            name="Keywords"
            displayName="Keywords"
            data={mediaDetails?.Keywords}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user="amin"
            itemKey={mediaDetails?.Key}
            itemName="keyword"
            token={identity.access_token}
            refetchData={refetchData}
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartDateTime"
          displayName="Added Date.."
          data={new Date(mediaDetails?.StartDateTime).toLocaleString()}
        />
        {mediaDetails?.CanEdit ? (
          <NetforumEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="NetforumLink"
            displayName="Netforum Link"
            data={mediaDetails?.NetforumItemLink}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            netForumBaseV1={"https://localhost:44340/api/v1/NetforumItems/"}
            netForumBaseV0={"https://localhost:44340/api/v0/NetforumItems/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="netforumItemLink"
            token={identity.access_token}
            refetchData={refetchData}
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="NetforumLink"
            displayName="Netforum Link"
            data={mediaDetails?.NetforumItemLink}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            netForumBaseV1={"https://localhost:44340/api/v1/NetforumItems/"}
            netForumBaseV0={"https://localhost:44340/api/v0/NetforumItems/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="netforumItemLink"
            token={identity.access_token}
            refetchData={refetchData}
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Media Item Key"
          data={mediaDetails?.Key}
        />
        <NonEditableField
          setter={setMediaDetails}
          isDetailsLoading={isDetailsLoading}
          name="Status"
          displayName="Current Status"
          data={mediaDetails?.Status}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="OriginalFileName"
          displayName="Original File Name"
          data={mediaDetails?.OriginalFileName}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FinalizedByUsername"
          displayName="Finalized by..."
          data={mediaDetails?.FinalizedByUsername}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FileSize"
          displayName="File Size(mb)"
          data={(parseInt(mediaDetails?.FileSize) / 1000000).toFixed(3)}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FinalizedDateTime"
          displayName="Finalized Date"
          data={mediaDetails?.FinalizedDateTime?new Date(mediaDetails?.FinalizedDateTime).toLocaleString():null}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FileDuration"
          displayName="File Duration"
          data={mediaDetails?.FileDuration}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Mediahost URL"
          data={mediaDetails?.MediaHostUrl}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user={identity?.profile?.given_name}
          itemKey={mediaDetails?.MediaHostUrl}
          itemName="originalfilename"
          token={identity.access_token}
        />
      </div>
      <div className="button-container">
        <DeleteButton
        setDetailsLoading={setDetailsLoading}
          disabled={!mediaDetails?.CanEdit}
          user={identity.given_name || "guest"}
          itemKey={mediaDetails?.Key}
          identity={identity}
          setErrorMsg={setErrorMsg}
          refetchData={refetchData}
          />
        <FinalizeButton
        setDetailsLoading={setDetailsLoading}
          disabled={!mediaDetails?.CanEdit}
          user={identity.given_name || "guest"}
          itemKey={mediaDetails?.Key}
          identity={identity}
          setErrorMsg={setErrorMsg}
          refetchData={refetchData}
        />
      </div>

      <OpenLogs data={mediaDetails?.MediaAudits} />
    </div>
 
  )}
  else return (
    <NewWindow key={mediaDetails?.Key}>
       <div className="details-page">
      <div className="details-bar">
        <span className="media-details-title">media details...</span>
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            window.open(
              `https://localhost:8080/?mediakey=${mediaKey}`,
              "_blank"
            );
          }}
        >
          <span>Key:</span> {mediaKey}
        </div>
        <div
          onClick={(e) => {
            panelState.details_container === 0
              ? dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" })
              : (function () {
                  refreshList((d) => !d);
                  dispatchPanelState({ type: "CLOSE DETAILS OPEN OTHER" });
                })();
          }}
          src={butt}
        ><Switch dispatchPanelState={dispatchPanelState} panelState={panelState} refreshList={refreshList} /> </div>
      </div>
      <div className="details-frame">
        {mediaDetails?.CanEdit ? (
          <EditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="Title"
            displayName="Title"
            data={mediaDetails?.Title}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="title"
            token={identity.access_token}
            refetchData
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="Title"
            displayName="Title"
            data={mediaDetails?.Title}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user="amin"
            itemKey={mediaDetails?.Key}
            itemName="title"
            token={identity.access_token}
            refetchData
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Added By.."
          data={mediaDetails?.StartedByUsername}
        />
        {mediaDetails?.CanEdit ? (
          <KeywordEditableField
            close={close}
            isDetailsLoading={isDetailsLoading}
            method="POST"
            setter={setMediaDetails}
            name="Keywords"
            displayName="Keywords"
            data={mediaDetails?.Keywords}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="keyword"
            token={identity.access_token}
            refetchData={refetchData}
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="POST"
            setter={setMediaDetails}
            name="Keywords"
            displayName="Keywords"
            data={mediaDetails?.Keywords}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            user="amin"
            itemKey={mediaDetails?.Key}
            itemName="keyword"
            token={identity.access_token}
            refetchData={refetchData}
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartDateTime"
          displayName="Added Date.."
          data={new Date(mediaDetails?.StartDateTime).toLocaleString()}
        />
        {mediaDetails?.CanEdit ? (
          <NetforumEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="NetforumLink"
            displayName="Netforum Link"
            data={mediaDetails?.NetforumItemLink}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            netForumBaseV1={"https://localhost:44340/api/v1/NetforumItems/"}
            netForumBaseV0={"https://localhost:44340/api/v0/NetforumItems/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="netforumItemLink"
            token={identity.access_token}
            refetchData={refetchData}
          />
        ) : (
          <NonEditableField
            isDetailsLoading={isDetailsLoading}
            method="PUT"
            setter={setMediaDetails}
            name="NetforumLink"
            displayName="Netforum Link"
            data={mediaDetails?.NetforumItemLink}
            endpoint={"https://localhost:44340/api/v1/Medias/"}
            netForumBaseV1={"https://localhost:44340/api/v1/NetforumItems/"}
            netForumBaseV0={"https://localhost:44340/api/v0/NetforumItems/"}
            user={identity?.profile?.given_name}
            itemKey={mediaDetails?.Key}
            itemName="netforumItemLink"
            token={identity.access_token}
            refetchData={refetchData}
          />
        )}
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Media Item Key"
          data={mediaDetails?.Key}
        />
        <NonEditableField
          setter={setMediaDetails}
          isDetailsLoading={isDetailsLoading}
          name="Status"
          displayName="Current Status"
          data={mediaDetails?.Status}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="OriginalFileName"
          displayName="Original File Name"
          data={mediaDetails?.OriginalFileName}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FinalizedByUsername"
          displayName="Finalized by..."
          data={mediaDetails?.FinalizedByUsername}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FileSize"
          displayName="File Size(mb)"
          data={(parseInt(mediaDetails?.FileSize) / 1000000).toFixed(3)}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FinalizedDateTime"
          displayName="Finalized Date"
          data={mediaDetails?.FinalizedDateTime?new Date(mediaDetails?.FinalizedDateTime).toLocaleString():null}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          setter={setMediaDetails}
          name="FileDuration"
          displayName="File Duration"
          data={mediaDetails?.FileDuration}
        />
        <NonEditableField
          isDetailsLoading={isDetailsLoading}
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Mediahost URL"
          data={mediaDetails?.MediaHostUrl}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user={identity?.profile?.given_name}
          itemKey={mediaDetails?.MediaHostUrl}
          itemName="originalfilename"
          token={identity.access_token}
        />
      </div>
      <div className="button-container">
        <DeleteButton
        setDetailsLoading={setDetailsLoading}
          disabled={!mediaDetails?.CanEdit}
          user={identity.given_name || "guest"}
          itemKey={mediaDetails?.Key}
          identity={identity}
          setErrorMsg={setErrorMsg}
          refetchData={refetchData}
          />
        <FinalizeButton
        setDetailsLoading={setDetailsLoading}
          disabled={!mediaDetails?.CanEdit}
          user={identity.given_name || "guest"}
          itemKey={mediaDetails?.Key}
          identity={identity}
          setErrorMsg={setErrorMsg}
          refetchData={refetchData}
        />
      </div>

      <OpenLogs data={mediaDetails?.MediaAudits} />
    </div>
 
    </NewWindow>
  )
  
}
