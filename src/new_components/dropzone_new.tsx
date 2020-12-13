import React from "react";

// import filechecker
import { isAcceptableType, isWithinSizeLimit } from "../utils/fileprocess";
import { getGuid } from "../utils/getguid";
import { DropFiles } from "./dropfiles";
import {VideoRecorder} from './VideoRecorder'
export function DropZone({
  setError,
  DISPATCHupload,
  sizeLimit = 45000000,
  dispatchPanelState,
  panelState,
  shouldRecord
}) {
  // Set up state for dropzone
  const [dropzoneSTATE, SETdropzone] = React.useState("dropzone-idle");
  const [animationVisible, setAnimationVisibility] = React.useState(false);
  const [dropEffectVisible, setDropEffectVisible] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const animatedhelper = React.useRef();
  let timeOut;

  React.useEffect(function(){

    // return ()=>clearTimeout(timeOut)
  })

if(!shouldRecord){
  return (
    <>
      {dropEffectVisible ? <DropFiles setDropEffectVisible={setDropEffectVisible} coordinates={mousePosition} /> : null}
      <div
        className="drag-animation"
        style={{
          display: `${animationVisible ? "block" : "none"}`,
          left: `${mousePosition.x - 950}px`,
          top: `${mousePosition.y - 250}px`,
        }}
      >{`Drop files here`}</div>
      <div
        className={dropzoneSTATE + " " + "s" + panelState["upload_container"]}
        onDragEnter={function (e) {
          e.preventDefault();
          e.stopPropagation();
          setAnimationVisibility(true);
          SETdropzone("dropzone-active");
        }}
        onDragOver={function (e) {
          e.preventDefault();
          e.stopPropagation();
          setMousePosition({ x: e.clientX, y: e.clientY });
          SETdropzone("dropzone-active");
        }}
        onDragLeave={function (e) {
          setAnimationVisibility(false);
          e.preventDefault();
          e.stopPropagation();
          SETdropzone("dropzone-idle");
        }}
        onDrop={function (e) {
          setDropEffectVisible(true);
          e.persist();
          e.preventDefault();
          e.stopPropagation();
          setAnimationVisibility(false);
          SETdropzone("dropzone-idle");
          let dt = e.dataTransfer;
          let files = Array.from(dt.files);
          let errorCollection= [];
          for (let i = 0; i < files.length; i++) {
            let timeout;
            let file = files[i];
            console.log("FILEZZ " + i, file);
            const guid = getGuid();
            if (isAcceptableType(file) && isWithinSizeLimit(file, sizeLimit)) {

           timeOut = setTimeout(()=>{ DISPATCHupload({
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
              dispatchPanelState({ type: "OPEN UPLOAD" }); },1500)
            } else if (!isAcceptableType(file)) {
              errorCollection.push(<h4>{`${file["name"]} is not an accepted video format`}</h4>);
            } else {
              errorCollection.push(<h4>{`${file["name"]} is not within the size limit of ${sizeLimit / 1000000} mb`}</h4>);
            }
          }
          if(errorCollection.length>0){setError(errorCollection)}
        }}
      ></div>
    </>
  );

      }

else {return <VideoRecorder setError={setError} DISPATCHupload={DISPATCHupload} dispatchPanelState={dispatchPanelState}/>}
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
