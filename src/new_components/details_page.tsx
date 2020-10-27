import * as React from "react";
import { Controls } from "./controls";
import { ControlButton } from "./control_button";
import { EditableField } from "./edit_field";
import { KeywordEditableField } from "./edit_field_Keywords";
import { NonEditableField } from "./non_edit_field";
import {OpenLogs} from "./open-logs-button"
import butt from "../images/switch.png";
import { DeleteButton } from "./delete_button";
import { FinalizeButton } from "./finalize_button";

export function DetailsPage({ mediaKey, panelState, dispatchPanelState }) {
  const [mediaDetails, setMediaDetails] = React.useState(null);

  React.useEffect(
    function () {
      fetch(`https://localhost:44340/api/v1/Medias/${mediaKey}/MediaDetailsVm`)
        .then((res) => res.json())
        .then((res) => setMediaDetails(res["Result"]));
      localStorage.removeItem("mediakey");
    },
    [mediaKey]
  );

  console.log("PANEL STATE", panelState);
  return (
    <div className="details-page">
      <div className="details-bar">
        <span>media details...</span>
        <div>Key: {mediaKey}</div>
        <img
          onClick={(e) => {
            panelState.details_container === 0
              ? dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" })
              : dispatchPanelState({ type: "CLOSE DETAILS OPEN OTHER" });
          }}
          src={butt}
        />
      </div>
      <div className="details-frame">
        <EditableField
          method="PUT"
          setter={setMediaDetails}
          name="Title"
          displayName="Title"
          data={mediaDetails?.Title}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="title"
        />
        <NonEditableField
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Added By.."
          data={mediaDetails?.StartedByUsername}
        />
        <KeywordEditableField
          method="POST"
          setter={setMediaDetails}
          name="Keywords"
          displayName="Keywords"
          data={mediaDetails?.Keywords}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="keyword"
        />
        <NonEditableField
          setter={setMediaDetails}
          name="StartDateTime"
          displayName="Added Date.."
          data={new Date(mediaDetails?.StartDateTime).toLocaleString()}
        />
        <EditableField
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Netforum Link"
          data={mediaDetails?.NetforumItemLink?.NetforumKey}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="netforumItemLink"
        />
        <NonEditableField
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Media Item Key"
          data={mediaDetails?.Key}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="Status"
          displayName="Current Status"
          data={mediaDetails?.Status}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="OriginalFileName"
          displayName="Original File Name"
          data={mediaDetails?.OriginalFileName}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="FinalizedByUsername"
          displayName="Finalized by..."
          data={mediaDetails?.FinalizedByUsername}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="FileSize"
          displayName="File Size(mb)"
          data={(parseInt(mediaDetails?.FileSize) / 1000000).toFixed(3)}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="FinalizedDateTime"
          displayName="Finalized Date"
          data={mediaDetails?.FinalizedDateTime}
        />
        <NonEditableField
          setter={setMediaDetails}
          name="FileDuration"
          displayName="File Duration"
          data={mediaDetails?.FileDuration}
        />
        <EditableField
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Mediahost URL"
          data={mediaDetails?.MediaHostUrl}
          endpoint={"https://localhost:44340/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.MediaHostUrl}
          itemName="originalfilename"
        />
        <OpenLogs />
      </div>
      
      <div className="button-container"><DeleteButton user="amin" itemKey={mediaDetails?.Key} />
      <FinalizeButton user="amin" itemKey={mediaDetails?.Key} /></div>
    </div>
  );
}
