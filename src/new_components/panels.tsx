import React from "react";

import { Drag } from "./draggable";

function panelReducer(state, action) {
  let newPanelState = state;

  switch (action.type) {
    case "OPEN UPLOAD":
      newPanelState = { ...newPanelState, upload_container: 2 };
      break;
    case "CLOSE UPLOAD":
      newPanelState = { ...newPanelState, upload_container: 0 };
      break;
    case "OPEN DETAILS CLOSE OTHERS":
      newPanelState = {
        upload_container: 0,
        list_container: 0,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 2,
      };
      break;
    case "OPEN DETAILS FLOAT":
      newPanelState = {
        ...newPanelState,
        details_container: 4,
      };
      break;
    case "OPEN DETAILS OPEN UPLOAD CLOSE OTHERS":
      newPanelState = {
        upload_container: 2,
        list_container: 0,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 2,
      };
      break;
    case "CLOSE DETAILS OPEN OTHERS":
      newPanelState = {
        upload_container: 2,
        list_container: 2,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 0,
      };
      break;
    case "OPEN PENDING":
      newPanelState = {
        ...newPanelState,
        list_container: 2,
        pending_container: 2,
        completed_container: 0,
        dropzone_container: 0,
        details_container: 0,
      };
      break;
    case "OPEN PENDING FLOAT":
      newPanelState = {
        ...newPanelState,
        pending_container: 2
      };
      break;
    case "OPEN COMPLETED FLOAT":
      newPanelState = {
        ...newPanelState,
        completed_container: 2
      };
      break;
    case "OPEN PARTIAL":
      newPanelState = {
        ...newPanelState,
        list_container: 2,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 0,
      };
      break;

    case "OPEN COMPLETED":
      newPanelState = {
        ...newPanelState,
        list_container: 2,
        pending_container: 0,
        completed_container: 2,
        dropzone_container: 0,
        details_container: 0,
      };
      break;
    case "OPEN DROPZONE":
      newPanelState = {
        ...newPanelState,
        list_container: 2,
        pending_container: 0,
        completed_container: 0,
        dropzone_container: 2,
        details_container: 0,
      };
      break;
    default:
      newPanelState = {
        upload_container: 0,
        list_container: 2,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 0,
      };
  }
  return newPanelState;
}
export function Panels(props) {
  // can dynamically change this if we have a detail key stored or passed down

  const initialPanelState = props.openDetails
    ? {
        upload_container: 0,
        list_container: 0,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 2,
      }
    : {
        upload_container: 0,
        list_container: 2,
        pending_container: 1,
        completed_container: 1,
        dropzone_container: 1,
        details_container: 0,
      };
  /* the reducer sets up the initial state of the panels, we should make the initial state of panels dependent on whether 
  there is a details key availble in storage - perhaps we implement that later down the component tree?
  */
  const [panelState, dispatchPanelState] = React.useReducer(
    panelReducer,
    initialPanelState
  );

  //this piece of code adds the panel state and panel state dispatcher to our anonymous children's props
  const elements = React.Children.map(props.children, (el) =>
    React.cloneElement(el, { panelState, dispatchPanelState, floatInfo:{pendingFloat:props.pendingFloat,sidePanel:props.sidePanel, finalizedFloat:props.finalizedFloat} })
  );

  console.log("panels", Panels);
  return (
    <div className="panel-container">
      {props.sidePanel ? (
        <Drag width="700px" isOpen={props.sidePanel}>{elements[0]}</Drag>
      ) : (
        <div className={`upload-container-${panelState.upload_container}`}>
          {elements[0]}
        </div>
      )}
      <div className={`list-container-${panelState.list_container}`} style={{justifyContent:props.pendingFloat && props.finalizedFloat?`center`:props.pendingFloat?`flex-end`:`flex-start`}}>
        {[
          props.pendingFloat ? <Drag width="700px" this_panel_state={panelState.pending_container}>{elements[1]}</Drag> : elements[1],
          elements[2],
          props.finalizedFloat ? <Drag width="700px" this_panel_state={panelState.completed_container}>{elements[3]}</Drag> : elements[3],
        ]}
      </div>
      <div className={`details-container-${panelState.details_container}`}>
        {elements[4]}
      </div>
    </div>
  );
}
