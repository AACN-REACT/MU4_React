// libraries
import React from "react";

//sub-components
//dropzone
import { DropZone } from "./dropzone/dropzone";
import { SelectFile } from "./dropzone/selectfile";
import { UploadTable } from "./ListTables/listtable";

// reducers
import { uploadListReducer } from "../utils/reducers/upload-list-reducer";

export function UploadContainer({ uploadURL, user, sizeLimit }) {
  //set up state for Uploading files
  const [uploadSTATE, DISPATCHUpload] = React.useReducer(uploadListReducer, {});

  console.log("upload state", uploadSTATE);
  return (
    <div>
      <DropZone DISPATCHupload={DISPATCHUpload} />
      <SelectFile DISPATCHupload={DISPATCHUpload} sizeLimit={sizeLimit} />
      <UploadTable
        list={uploadSTATE}
        url={uploadURL}
        dispatch={DISPATCHUpload}
        user={user}
      />
    </div>
  );
}
