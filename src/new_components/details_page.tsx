import * as React from "react";
import { Controls } from "./controls";
import { ControlButton } from "./control_button";
import { EditableField } from "./edit_field";
import butt from "../images/switch.png";
import { DeleteButton } from "./delete_button";

export function DetailsPage({ mediaKey, panelState, dispatchPanelState }) {
  const [mediaDetails, setMediaDetails] = React.useState(null);

  React.useEffect(
    function () {
      fetch(`https://localhost:44340/api/v1/Medias/${mediaKey}/MediaDetailsVm`)
        .then((res) => res.json())
        .then((res) => setMediaDetails(res["Result"]));
    },
    [mediaKey]
  );

  console.log("PANEL STATE", panelState);
  return (
    <div className="details-page">
      <div className="details-bar">
        <span>media details...</span>
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
        <EditableField
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Netforum Link"
          data={mediaDetails?.NetforumItemLink?.NetforumKey}
          endpoint={"https://localhost:44325/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="netforumItemLink"
        />
        <EditableField
          method="PUT"
          setter={setMediaDetails}
          name="NetforumLink"
          displayName="Mediahost URL"
          data={mediaDetails?.MediaHostUrl}
          endpoint={"https://localhost:44325/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="originalfilename"
        />
        <EditableField
          method="POST"
          setter={setMediaDetails}
          name="Keywords"
          displayName="Keywords"
          data={mediaDetails?.Keywords}
          endpoint={"https://localhost:44325/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="keyword"
        />
        <EditableField
          setter={setMediaDetails}
          name="StartedByUsername"
          displayName="Added By.."
          data={mediaDetails?.StartedByUsername}
          endpoint={"https://localhost:44325/api/v1/Medias/"}
          user="amin"
          itemKey={mediaDetails?.Key}
          itemName="StartedByUserName"
        />
        <DeleteButton user="amin" itemKey={mediaDetails?.Key} />
      </div>
    </div>
  );
}
