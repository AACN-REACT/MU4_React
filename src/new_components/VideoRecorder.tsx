import React from "react";
import { recordVideo } from "../utils/record_video";
import { getGuid } from "../utils/getguid";

function Record(recorder, addChunks, chunks) {
  recorder.start();
  recorder.ondataavailable = function (e) {
    console.log("my file data", e.data);
    addChunks((chunks) => {
      return chunks.push(e.data);
    });
    console.log("chunks", chunks);
  };
}
function Stop(recorder) {
  let recording;
  if (recorder.state === "recording") recording = recorder.stop();

  console.log("recording", recorder);

  // const guid = getGuid();
  //         if (isAcceptableType(file) && isWithinSizeLimit(file, sizeLimit)) {

  //        DISPATCHupload({
  //             type: "ADD",
  //             action: {
  //               [guid]: {
  //                 name: file["name"].split(".")[0],
  //                 size: (parseInt(file["size"]) / 1000000).toFixed(1) + "mb",
  //                 type: file["type"]
  //                   .substring(file["type"].indexOf("/"))
  //                   .slice(1),
  //                 file: file,
  //                 status: "pending",
  //                 id: guid,
  //                 progress: 0,
  //               },
  //             },
  //           });
  //           dispatchPanelState({ type: "OPEN UPLOAD" }); },1500)
  //         } else if (!isAcceptableType(file)) {
  //           errorCollection.push(<h4>{`${file["name"]} is not an accepted video format`}</h4>);
  //         } else {
  //           errorCollection.push(<h4>{`${file["name"]} is not within the size limit of ${sizeLimit / 1000000} mb`}</h4>);
  //         }
  //       }
  //       if(errorCollection.length>0){setError(errorCollection)}
}

export function VideoRecorder({
  setError,
  DISPATCHupload,
  dispatchPanelState,
}) {
  const [videoStream, setVideoStream] = React.useState(undefined);
  const [recorder, setRecorder] = React.useState(undefined);
  const [chunks, addChunks] = React.useState([]);
  const videoDisplay = React.useRef();
  const linkRef = React.useRef();
  React.useEffect(() => {
    recordVideo(setError, setVideoStream, videoDisplay.current, setRecorder);
    videoDisplay.current.srcObject = videoStream;
    console.log("recorder", recorder);
    return () => {
      alert(videoStream);
      videoStream?.getTracks().forEach((track) => track.stop());
      setRecorder(undefined);
    };
  }, [videoDisplay.current]);

  React.useEffect(
    function () {
      if (recorder) {
        // recorder.ondataavailable = function (e) {
        //   addChunks((chunks) => [...chunks, e.data]);
        //   console.log("chunks",chunks)
        // };

        recorder.onstop = function (e) {
          let blob = new Blob(chunks, { type: "webm" });
          //let file = URL.createObjectURL(blob);
          let file = URL.createObjectURL(blob);
          console.log("my file", file);
          addChunks([]);
          const guid = getGuid();
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          let uploadFile;
          reader.onloadend = function () {
            uploadFile = reader.result;
            console.log("***", uploadFile.type ? uploadFile.type : "no type");
          };
          if (linkRef?.current) linkRef.current.href = file;
          DISPATCHupload({
            type: "ADD",
            action: {
              [guid]: {
                name: "recording",
                size: String((blob.size / 1000000).toFixed(1)) + "mb",
                type: "webm",
                file: new File([blob], "upload.webm", { type: "video/webm" }),
                status: "pending",
                id: guid,
                progress: 0,
              },
            },
          });
          dispatchPanelState({ type: "OPEN UPLOAD" });
        };
      }
    },
    [recorder, chunks]
  );
  return (
    <div className="video-recorder-container">
      <video ref={videoDisplay} autoPlay controls></video>
      <div className="button-container">
        <button
          onClick={(e) => {
            videoDisplay.current
              .captureStream()
              .getTracks()
              .forEach((track) => {
                console.log("track", track);
                track.stop();
              });
          }}
        >
          Quit
        </button>
        <button
          style={{
            backgroundColor: recorder?.state === "recording" ? "red" : "gray",
          }}
          onClick={(e) => {
            Record(recorder, addChunks, chunks);
          }}
        >
          Record
        </button>
        <button
          onClick={(e) => {
            Stop(recorder);
          }}
        >
          Stop{" "}
        </button>
        <button
          onClick={(e) => {
            Stop(recorder);
          }}
        >
          <a ref={linkRef} download="someName.webm">
            Dload
          </a>
        </button>
      </div>
    </div>
  );
}
