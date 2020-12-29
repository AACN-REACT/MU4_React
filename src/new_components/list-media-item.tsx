import React from 'react'





export function ListMediaItem({panelStateNumber, mediaItem, dispatchPanelState, setMediaKey,isSelected}){

  


       return ( <div
              className={isSelected?"inner-container selected":"inner-container"}
              
              onClick={(e) => {
                

                setMediaKey(mediaItem.Key);
                e.shiftKey?dispatchPanelState({ type: "OPEN DETAILS FLOAT"}):dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" });
              }}
            >
              <div key="column-title" className="column-title">
                {mediaItem.Title}
              </div>
              <div
                key="column-original"
                className={`"column-title" ${
                  panelStateNumber === 2 ? "" : "column-close"
                }`}
                style={
                  panelStateNumber === 2
                    ? { inherit: "" }
                    : { width: "0px" }
                }
              >
                {mediaItem.OriginalFileName}
              </div>
              <div
                key="column-addedBy"
                className={`column-addedBy ${
                  panelStateNumber === 2 ? "" : "column-close"
                }`}
              >
                {mediaItem.StartedByUsername}
              </div>
              <div key="column-size" className="column-size">
                {(parseInt(mediaItem.FileSize) / 1000000).toFixed(1)}
              </div>
              <div
                key="column-keywords"
                className={`column-keywords ${
                  panelStateNumber === 2 ? "" : "column-close"
                }`}
              >
                {mediaItem.HasKeywords ? (
                  <span className="true">{String.fromCharCode(10004)}</span>
                ) : (
                  <span className="false">
                    {" "}
                    {String.fromCharCode(10008)}
                  </span>
                )}
              </div>
              <div
                key="column-netforum"
                className={`column-netforum ${
                  panelStateNumber === 2 ? "" : "column-close"
                }`}
              >
                {mediaItem.HasNetforumLink ? (
                  <span className="true">{String.fromCharCode(10004)}</span>
                ) : (
                  <span className="false">
                    {" "}
                    {String.fromCharCode(10008)}
                  </span>
                )}
              </div>
              <div
                key="column-status"
                className={`column-status ${
                  panelStateNumber === 2 ? "" : "column-close"
                }`}
              >
                {mediaItem.Status}
              </div>
              <div key="column-date" className="column-date">
                {new Date(mediaItem.StartDateTime).toDateString()}
                <div className="date-time">
                  {new Date(mediaItem.StartDateTime).toLocaleTimeString()}
                </div>
              </div>
            </div>

)


    
}