import * as React from "react";
import { Controls } from "./controls";
import { ControlButton } from "./control_button";
import { Dummy } from "./dummy";

export function DetailsPage({ mediaKey, panelState, dispatchPanelState }) {
  const [mediaDetails, setMediaDetails] = React.useState(null);

  React.useEffect(
    function () {
      fetch(`https://localhost:44390/api/v1/Medias/${mediaKey}/MediaDetailsVm`)
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
        <button
          onClick={(e) => {
            panelState.details_container === 0
              ? dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" })
              : dispatchPanelState({ type: "CLOSE DETAILS OPEN OTHER" });
          }}
        />
      </div>
      <div className="details-frame">
          <

      </div>

    </div>
  );
}
