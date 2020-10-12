import * as React from "react";

//import filechecker
import { isAcceptableType, isWithinSizeLimit } from "../utils/fileprocess";
import { getGuid } from "../utils/getguid";

function clickHiddenInput (inputRef) {
  inputRef.current.click();
 

}
export function SelectFile({
  DISPATCHupload,
  sizeLimit,
  dispatchPanelState,
  setError,
}) {
  //set up ref to hidden input field
  const inputField = React.useRef();

  return (
    <div className="select-container">
      <input
        key="inputField"
        ref={inputField}
        type="file"
        hidden
        multiple
        onChange={(e) => {
          e.persist();

          let files = e.target.files;
          console.log("select", e, files);
          for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const guid = getGuid();
            if (isAcceptableType(file) && isWithinSizeLimit(file, sizeLimit)) {
              console.log("select", file);

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
                `${file["name"]} is not within the size limit of ${sizeLimit} `
              );
            }
          }
          inputField.current.value="";
        }}
      />
      <div
        className={"select-button"}
        onClick={(e)=>{
            clickHiddenInput(inputField)
        }}
      >
        Select Files
      </div>
    </div>
  );
}
