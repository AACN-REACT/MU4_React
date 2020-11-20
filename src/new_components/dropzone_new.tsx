import React from "react";

// import filechecker
import { isAcceptableType, isWithinSizeLimit } from "../utils/fileprocess";
import { getGuid } from "../utils/getguid";

export function DropZone({
  DISPATCHupload,
  sizeLimit = 45000000,
  dispatchPanelState,
}) {
  // Set up state for dropzone
  const [dropzoneSTATE, SETdropzone] = React.useState("dropzone-idle");

  return (
    <div
      className={dropzoneSTATE}
      onDragEnter={function (e) {
        e.preventDefault();
        e.stopPropagation();
        SETdropzone("dropzone-active");
      }}
      onDragOver={function (e) {
        e.preventDefault();
        e.stopPropagation();
        SETdropzone("dropzone-active");
      }}
      onDragLeave={function (e) {
        e.preventDefault();
        e.stopPropagation();
        SETdropzone("dropzone-idle");
      }}
      onDrop={function (e) {
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        SETdropzone("dropzone-idle");
        let dt = e.dataTransfer;
        let files = Array.from(dt.files);
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          console.log("FILEZZ " + i, file);
          const guid = getGuid();
          if (isAcceptableType(file) && isWithinSizeLimit(file, sizeLimit)) {
            console.log("dropzone file", file);
            DISPATCHupload({
              type: "ADD",
              action: {
                [guid]: {
                  name: file["name"].split(".")[0],
                  size: (parseInt(file["size"]) / 1000000).toFixed(1) + "mb",
                  type: file["type"]
                    .substring(file["type"].indexOf("/"))
                    .slice(1),
                  file: file,
                  status: "pending",
                  id: guid,
                  progress: 0,
                },
              },
            });
            dispatchPanelState({ type: "OPEN UPLOAD" });
          } else if (!isAcceptableType(file)) {
            alert(`${file["name"]} is not an accepted video format`);
          } else {
            alert(
              `${file["name"]} is not within the size limit of ${
                sizeLimit / 1000000
              } mb`
            );
          }
        }
      }}
    ></div>
  );
}

// onChange={(e) => {
//   let files = e.target.files;
//   console.log('select', e,files)
//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     const guid = getGuid();
//     if (isAcceptableType(file) && isWithinSizeLimit(file,sizeLimit)) {
//         console.log("select", file)
//       DISPATCHupload({
//         type: "ADD",
//         action: {
//             [guid]: {
//               name: (file["name"]).split('.')[0],
//               size: (parseInt(file["size"])/1000000).toFixed(1)+"mb",
//               type: (file["type"]).substring(file['type'].indexOf('/')).slice(1),
//               file: file,
//               status:"pending",
//               id: guid,
//               progress: 0,
//             },
//         },
//       });
//       dispatchPanelState({ type: "OPEN UPLOAD" });
//     } else if (!isAcceptableType(file)){
//       alert(`${file['name']} is not an accepted video format`);
//     }
//     else {
//         alert(`${file['name']} is not within the size limit of ${sizeLimit} `)
//     }
//   }
// }}
