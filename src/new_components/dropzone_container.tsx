import React from "react";

//sub-components
//dropzone
import { DropZone } from "./dropzone_new";
import { SelectFile } from "./selectfile_new";
import { UploadTable } from "../components/ListTables/listtable";
import backgroundLogo from '../images/SVG/backgroundlogo.svg'
// reducers
import { uploadListReducer } from "../utils/reducers/upload-list-reducer";

export function DropzoneContainer({
  uploadURL,
  user,
  sizeLimit,
  panelState,
  dispatchPanelState,
  uploadSTATE,
  DISPATCHUpload,
  setError,
  shouldRecord
}) {
  //set up state for Uploading files
  //const [uploadSTATE, DISPATCHUpload] = React.useReducer(uploadListReducer, {});

  console.log("upload state", uploadSTATE);
  return (
    <div  style={{position:'relative',backgroundImage:`url(${backgroundLogo})`}} className={`dropzone-container-${panelState.dropzone_container}`}>

      <DropZone
        DISPATCHupload={DISPATCHUpload}
        sizeLimit={sizeLimit}
        dispatchPanelState={dispatchPanelState}
        setError={setError}
        panelState={panelState}
        shouldRecord={shouldRecord}
      />
      <SelectFile
        setError={setError}
        DISPATCHupload={DISPATCHUpload}
        sizeLimit={sizeLimit}
        dispatchPanelState={dispatchPanelState}
           />
      {/* <UploadTable list={uploadSTATE} url={uploadURL} dispatch={DISPATCHUpload} user={user}/> */}
    </div>
  );
}
