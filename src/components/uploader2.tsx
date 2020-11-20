import React from "react";
import { getGuid } from "../utils/getguid.ts";
//import icon from '../icon.gif'
import {
  dragenter,
  dragleave,
  dragover,
  drop,
  pick,
} from "../utils/eventhandlers";
import network from "../utils/networkrequests";
import { DropZone } from "./dropzone/dropzoneOLD";
import { FileList } from "./filelist.jsx";
import { FileInput } from "./fileinput.jsx";
import { UploadTable } from "./ListTables/listtable";

// fileitem:  {name, id, size, time, progress, }
function uploadListReducer(state, { type, action }) {
  let newstate = { ...state };
  switch (type) {
    case "ADD":
      alert("yay");
      newstate = { ...newstate, ...action };
      break;
    case "DELETE":
      delete newstate[action];
      break;
    case "EDIT":
      for (let i of newstate) {
        if (i["id"] === action) {
          i["edit"] = true;
        } else {
          i["edit"] == false;
        }
      }
      break;
    case "ABORT":
      newstate = {
        ...newstate,
        [action]: { ...newstate[action], abort: true },
      };
      break;
    default:
      break;
  }
  console.log("Reducer fired!!", action, newstate);
  return newstate;
}

export function Uploader2() {
  const [uploadingFiles, dispatchFile] = React.useReducer(
    uploadListReducer,
    {}
  );

  const [dropzoneState, setDropZoneState] = React.useState("dropzone-idle");

  return (
    <div>
      <div className="center-content">
        <DropZone
          dropZoneState={dropzoneState}
          setDropZoneState={setDropZoneState}
          dispatch={dispatchFile}
          dragEvents={{ dragenter, dragleave, dragover, drop, pick }}
        />
      </div>
      <UploadTable listobject={uploadingFiles} />
    </div>
  );
}
