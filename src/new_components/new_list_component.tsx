import * as React from "react";
import butt from "../images/switch.png";
import { Paginate } from "../utils/sorting/sorting_algorithms";
export function ListComponent({
  heading,
  dispatchPanelState,
  panelState,
  videolist,
  setMediaKey,
}) {
  //not sure what this does just yet
  let [list, changelist] = React.useState([]);

  let pagedList = [];

  const [pageNumber, changePageNumber] = React.useState(0);
  // this extaract the number for the specific panelState
  const panelStateNumber = panelState[`${heading.toLowerCase()}_container`];
  React.useEffect(() => {
    changelist(Paginate(videolist, 10));
  }, [videolist]);

  return (
    <div className={`list-${panelStateNumber}`}>
      <div className="list-heading">
        <div>{heading}...</div>
        <div
          onClick={(e) => {
            dispatchPanelState({
              type:
                panelStateNumber === 0 || panelStateNumber === 2
                  ? "OPEN PARTIAL"
                  : `OPEN ${heading.toUpperCase()}`,
            });
          }}
          className="switch"
        >
          <img src={butt} />
        </div>
      </div>
      <div className="page-controls">
        <div
          onClick={(e) =>
            changePageNumber((s) => {
              if (s > 0) {
                return s - 1;
              }
              return s;
            })
          }
        >
          backwards
        </div>
        <div>Page {pageNumber + 1}</div>
        <div
          onClick={(e) =>
            changePageNumber((s) => {
              if (s < list.length - 1) {
                return s + 1;
              }
              return s;
            })
          }
        >
          forwards
        </div>
      </div>
      <div className="inner-container">
        <div key="title" className="column-title">
          Title
        </div>
        <div
          key="original"
          className={
            panelStateNumber === 2 ? "column-double-line" : "column-close"
          }
        >
          Original Filename
        </div>
        <div
          key="addedby"
          className={`column-addedBy ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
        >
          Added By..
        </div>
        <div key="size" className="column-size">
         <p>Size</p>
         <p>MB</p>
        </div>
        <div
          key="keywords"
          className={`column-keywords ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
        >
          Has Keywords?
        </div>
        <div
          key="netforum"
          className={`column-double-line ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
        >
          Linked to Netforum
        </div>
        <div
          key="status"
          className={`column-status ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
        >
          Status
        </div>
        <div key="date" className="column-date">
          Date
        </div>
      </div>
      <div
        className={`paged-list`}
        style={{
          width: `${(list.length + 1) * 100}%`,
          left: `-${pageNumber * 100}%`,
        }}
      >
        {list.map((page: [], pageInd) => {
          console.log("PeL", pagedList);
          let thisPageList = page.map((mediaItem, mediaInd) => {
            return (
              <div
                className="inner-container"
                onClick={(e) => {
                  setMediaKey(mediaItem.Key);
                  dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" });
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
                    panelStateNumber === 2 ? { inherit: "" } : { width: "0px" }
                  }
                >
                  {mediaItem.Title}
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
                  {mediaItem.HasKeywords
                    ? <span className="true">{String.fromCharCode(10004)}</span>
                    : <span className="false"> {String.fromCharCode(10008)}</span>}
                </div>
                <div
                  key="column-netforum"
                  className={`column-netforum ${
                    panelStateNumber === 2 ? "" : "column-close"
                  }`}
                >
                  {mediaItem.HasNetforumLink
                    ? <span className="true">{String.fromCharCode(10004)}</span>
                    : <span className="false"> {String.fromCharCode(10008)}</span>}
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
                </div>
              </div>
            );
          });
          return <div className="individual-pages">{thisPageList}</div>;
        })}
      </div>
    </div>
  );
}

// {pagedList.map((page: [], pageInd) => {
//   console.log("PeL",pagedList)
//   let thisPageList = page.map((mediaItem, mediaInd) => {
//     return (
//       <>
//         <div key={mediaItem.Key} className="column-title">
//           {mediaItem.Title}
//         </div>
//         <div
//           key={mediaItem.Key}
//           className={`column-original ${
//             panelStateNumber === 3 ? "" : "column-close"
//           }`}
//         >
//           {mediaItem.Title}
//         </div>
//         <div
//           key={mediaItem.Key}
//           className={`column-addedBy ${
//             panelStateNumber === 3 ? "" : "column-close"
//           }`}
//         >
//           {mediaItem.Title}
//         </div>
//         <div key={mediaItem.Key} className="column-size">
//           Size
//         </div>
//         <div
//           key={mediaItem.Key}
//           className={`column-keywords ${
//             panelStateNumber === 3 ? "" : "column-close"
//           }`}
//         >
//           {mediaItem.Title}
//         </div>
//         <div
//           key={mediaItem.Key}
//           className={`column-netforum ${
//             panelStateNumber === 3 ? "" : "column-close"
//           }`}
//         >
//           {mediaItem.Title}
//         </div>
//         <div key={mediaItem.Key} className="column-status">
//         {mediaItem.Title}
//         </div>
//         <div key={mediaItem.Key} className="column-date">
//         {mediaItem.Title}
//         </div>
//       </>
//     );
//   });
//   return <div className="individual-list-item">{thisPageList}</div>;
// })}
