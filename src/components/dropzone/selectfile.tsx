import * as React from "react";

//import filechecker
import { isAcceptableType, isWithinSizeLimit} from "../../utils/fileprocess";
import { getGuid } from "../../utils/getguid";

export function SelectFile({ DISPATCHupload, sizeLimit}) {
  //set up ref to hidden input field
  const inputField = React.useRef();

  return (
    <div className="select-container">
      <input
        ref={inputField}
        type="file" 
        hidden
        multiple
        onChange={(e) => {
          let files = e.target.files;
          console.log('select', e,files)
          for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const guid = getGuid();
            if (isAcceptableType(file) && isWithinSizeLimit(file,sizeLimit)) {
                console.log("select", file)
              DISPATCHupload({
                type: "ADD",
                action: {
                    [guid]: {
                      name: (file["name"]).split('.')[0],
                      size: (parseInt(file["size"])/1000000).toFixed(1)+"mb",
                      type: (file["type"]).substring(file['type'].indexOf('/')).slice(1),
                      file: file,
                      id: guid,
                      progress: 0,
                    },
                },
              });
            } else if (!isAcceptableType(file)){
              alert(`${file['name']} is not an accepted video format`);
            }
            else {
                alert(`${file['name']} is not within the size limit of ${sizeLimit} `)
            }
          }
        }}
      />
      <div
        className={"select-button"}
        onClick={function (e) {
          inputField.current.click();
        }}
      >Select Files</div> 
    </div>
  );
}
