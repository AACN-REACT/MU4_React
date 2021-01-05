import React from "react";

import { UploadingListItem } from "./listitems";
import { Switch } from "../../new_components/switch-upload";

import butt from "../images/switch.png";

export function UploadTable({
  setFloat,
  isFloat,
  floatInfo,
  setMediaKey,
  list,
  url,
  user,
  dispatch,
  panelState,
  dispatchPanelState,
  setError,
}) {
  //create a list from the list

  let arr = [];
  let activelist = [],
    completedlist = [],
    editablelist = [],
    pendinglist = [];
  // makes an array 'arr' from 'list' object
  for (let i in list) {
    arr.push({ ...list[i] });
  }
  activelist = arr.filter((item, ind, arr) => item.status === "active");
  completedlist = arr.filter((item, ind, arr) => item.status === "completed");
  editablelist = arr.filter((item, ind, arr) => item.status === "canedit");
  pendinglist = arr.filter((item, ind, list) => item.status === "pending");

  const [shouldClose, setShouldClose] = React.useState(false);
  /* this runs after commit phase and re-renders evertime activelist changes, may need to useMemo? */
  React.useEffect(
    function () {
      if (arr.length > 0) {
        setShouldClose(false);
        if (activelist.length < 2) {
          if (pendinglist.length > 0) {
            dispatch({ type: "ACTIVE", action: pendinglist[0].id });
          }
        }
      }

      //if(arr.length===0){dispatchPanelState({ type: "CLOSE UPLOAD" })}
      return () => null;
    },
    [activelist]
  );

  React.useEffect(
    function () {
      if (shouldClose && arr.length === 0) {
        dispatchPanelState({ type: "CLOSE UPLOAD" });
      }
    },
    [shouldClose]
  );
  console.log("... uploadTable", setError);
  return (
    <div className="upload-container">
      <div
        className="upload-heading"
        style={{ cursor: isFloat ? "move" : "pointer" }}
        onDoubleClick={(e) => setFloat((s) => !s)}
      >
        {" "}
        <span>uploading details...</span>
        <Switch
          panelState={panelState.upload_container}
          dispatchPanelState={dispatchPanelState}
        />
      </div>
      {arr.length > 0 ? (
        <div className="upload-container">
          <div className="loading-bar active" key="active">
            {activelist.length > 0 ? "ACTIVE" : null}
            {activelist.map((item) => (
              <UploadingListItem
                status={item.status}
                dispatch={dispatch}
                key={item.id}
                item={item}
                url={url}
                user={user}
                SetErrorMsg={setError}
                setShouldClose={setShouldClose}
              />
            ))}
          </div>
          <div className="loading-bar pending" key="pending">
            {" "}
            {pendinglist.length > 0 ? "PENDING" : null}
            {pendinglist.map((item) => (
              <UploadingListItem
                status={item.status}
                dispatch={dispatch}
                key={item.id}
                item={item}
                url={url}
                user={user}
              />
            ))}
          </div>
          <div className="loading-bar completed" key="completed">
            {completedlist.length > 0 ? "COMPLETED" : null}
            {completedlist.map((item) => (
              <UploadingListItem
                status={item.status}
                dispatch={dispatch}
                key={item.id}
                item={item}
                url={url}
                user={user}
                setShouldClose={setShouldClose}
              />
            ))}
          </div>
          <div className="loading-bar canedit" key="canedit">
            {editablelist.length > 0 ? "EDIT" : null}
            {editablelist.map((item) => (
              <UploadingListItem
                setMediaKey={setMediaKey}
                panelState={panelState}
                dispatchPanelState={dispatchPanelState}
                status={item.status}
                dispatch={dispatch}
                key={item.id}
                item={item}
                url={url}
                user={user}
                setShouldClose={setShouldClose}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
