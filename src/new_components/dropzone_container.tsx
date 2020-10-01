import * as React from "react";

//sub-components
//dropzone
import { DropZone } from "./dropzone_new";
import { SelectFile } from "./selectfile_new";
import { UploadTable } from "../components/ListTables/listtable";

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
}) {
  //set up state for Uploading files
  //const [uploadSTATE, DISPATCHUpload] = React.useReducer(uploadListReducer, {});

  console.log("upload state", uploadSTATE);
  return (
    <div className={`dropzone-container-${panelState.dropzone_container}`}>
      <DropZone
        DISPATCHupload={DISPATCHUpload}
        sizeLimit={sizeLimit}
        dispatchPanelState={dispatchPanelState}
      />
      <SelectFile
        DISPATCHupload={DISPATCHUpload}
        sizeLimit={sizeLimit}
        dispatchPanelState={dispatchPanelState}
      />
      {/* <UploadTable list={uploadSTATE} url={uploadURL} dispatch={DISPATCHUpload} user={user}/> */}
    </div>
  );
}
