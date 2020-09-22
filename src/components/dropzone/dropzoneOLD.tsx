import * as React from "react";
import { getGuid } from "../../utils/getguid";
export function DropZone({
  dropZoneState,
  setDropZoneState,
  dragEvents,
  dispatch,
}) {
  let hiddenInput = React.useRef();

  return (
    <div
      onClick={(e) => {
        console.log(dispatch);
        dispatch({
          type: "ADD",
          action: {
            "third-guid": { name: "dsfsdfsf", size: 234324, edit: false },
          },
        });
      }}
      className={dropZoneState}
      onDragOver={function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDropZoneState("dropzone-ready");
      }}
      onDragLeave={function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDropZoneState("dropzone-idle");
      }}
      onDrop={function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert(getGuid());
        let dt = e.dataTransfer;
        let files = dt.files;
        console.log("FILESS", files);

        for (let i of files) {
          let guid = getGuid();
          dispatch({
            type: "ADD",
            action: {
              [guid]: {
                name: i.name,
                type: i.type,
                id: guid,
                file: i,
                size: i.size,
                progress: 0,
                edit: false,
              },
            },
          });
        }
      }}
    >
      <input ref={hiddenInput} hidden type="file" id="selectField" multiple />
      <button
        className="select-file-button"
        onClick={function (e) {
          hiddenInput.current.click();
        }}
      >
        Select files
      </button>
    </div>
  );
}
