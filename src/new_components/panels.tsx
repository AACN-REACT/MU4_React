import * as React from "react";

const initialPanelState = {
  upload_container: 0,
  list_container: 2,
  pending_container: 1,
  completed_container: 1,
  dropzone_container: 1,
  details_container: 0,
};

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
  const [panelState, dispatchPanelState] = React.useReducer(
    panelReducer,
    initialPanelState
  );

  const elements = React.Children.map(props.children, (el) =>
    React.cloneElement(el, { panelState, dispatchPanelState })
  );
  console.log("panels", Panels);
  return (
    <div className="panel-container">
      <div className={`upload-container-${panelState.upload_container}`}>{elements[0]}</div>
      <div className={`list-container-${panelState.list_container}`}>
        {[elements[1], elements[2], elements[3]]}
      </div>
      <div onMouseOut={e=>dispatchPanelState({type:"CLOSE DETAILS OPEN OTHERS"})} onMouseOver={e=>dispatchPanelState({type:"OPEN DETAILS CLOSE OTHERS"})} className={`details-container-${panelState.details_container}`}>{[elements[4]]}</div>
    </div>
  );
}
