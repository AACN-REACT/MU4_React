import * as React from "react";
import butt from "../images/switch.png";
import { Paginate } from "../utils/sorting/sorting_algorithms";
import {
  sortNewestDate,
  sortOldestDate,
  sortTitle,
  sortTitleReverse,
  sortFileSize,
  sortFileSizeReverse,
  sortNetforumLink,
  sortNetforumLinkReverse,
  sortKeywords,
  sortKeywordsReverse,
  sortAddedBy,
  sortAddedByReverse,
  sortOriginal,
  sortOriginalReverse,
} from "../utils/sorting/sorting_algorithms";
import { textSearch } from "../utils/sorting/levenshtein";
export function ListComponent({
  heading,
  dispatchPanelState,
  panelState,
  videolist,
  setMediaKey,
}) {
  //not sure what this does just yet
  let [list, changeList] = React.useState([]);

  const [transforms, setTransforms] = React.useState([
    //sortTitle,
    // sortFileSize,
    // sortNewestDate,
  ]);
  console.log("tt", transforms);

  const searchValue = React.useRef();

  const [pageNumber, changePageNumber] = React.useState(0);
  // this extaract the number for the specific panelState
  const panelStateNumber = panelState[`${heading.toLowerCase()}_container`];

  React.useEffect(() => {
    let internalList = [];
    transforms.length > 0
      ? transforms.forEach((func) => {
          internalList = videolist.sort(func);
        })
      : (internalList = videolist);
    changeList(Paginate(internalList, 10));
  }, [videolist, transforms]);

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
          {String.fromCharCode(9664)}
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
          {String.fromCharCode(9658)}
        </div>
      </div>
      <div className="search-bar">
        <label>Search</label>
        <input
          onChange={(e) => {
            changeList(
              Paginate(
                textSearch(searchValue.current.value, videolist, "Title"),
                10
              )
            );
          }}
          type="text"
          ref={searchValue}
          className="search"
        />
      </div>
      <div className="inner-container">
        <div
          key="title"
          className="column-title"
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortTitle) > -1) {
                return [
                  ...t.filter((el) => el !== sortTitle),
                  sortTitleReverse,
                ];
              }
              return [...t.filter((el) => el !== sortTitleReverse), sortTitle];
            });
          }}
        >
          Title
        </div>
        <div
          key="original"
          className={
            panelStateNumber === 2 ? "column-double-line" : "column-close"
          }
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortOriginal) > -1) {
                return [
                  ...t.filter((el) => el !== sortOriginal),
                  sortOriginalReverse,
                ];
              }
              return [
                ...t.filter((el) => el !== sortOriginalReverse),
                sortOriginal,
              ];
            });
          }}
        >
          Original Filename
        </div>
        <div
          key="addedby"
          className={`column-addedBy ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortAddedBy) > -1) {
                return [
                  ...t.filter((el) => el !== sortAddedBy),
                  sortAddedByReverse,
                ];
              }
              return [
                ...t.filter((el) => el !== sortAddedByReverse),
                sortAddedBy,
              ];
            });
          }}
        >
          Added By..
        </div>
        <div
          key="size"
          className="column-size"
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortFileSize) > -1) {
                return [
                  ...t.filter((el) => el !== sortFileSize),
                  sortFileSizeReverse,
                ];
              }
              return [
                ...t.filter((el) => el !== sortFileSizeReverse),
                sortFileSize,
              ];
            });
          }}
        >
          <p>Size</p>
          <p>MB</p>
        </div>
        <div
          key="keywords"
          className={`column-keywords ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortKeywords) > -1) {
                return [
                  ...t.filter((el) => el !== sortKeywords),
                  sortKeywordsReverse,
                ];
              }
              return [
                ...t.filter((el) => el !== sortKeywordsReverse),
                sortKeywords,
              ];
            });
          }}
        >
          Has Keywords?
        </div>
        <div
          key="netforum"
          className={`column-double-line ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortNetforumLink) > -1) {
                return [
                  ...t.filter((el) => el !== sortNetforumLink),
                  sortNetforumLinkReverse,
                ];
              }
              return [
                ...t.filter((el) => el !== sortNetforumLinkReverse),
                sortNetforumLink,
              ];
            });
          }}
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
        <div
          key="date"
          className="column-date"
          onClick={function (e) {
            setTransforms((t) => {
              if (t.indexOf(sortNewestDate) > -1) {
                return [
                  ...t.filter((el) => el !== sortNewestDate),
                  sortOldestDate,
                ];
              }
              return [
                ...t.filter((el) => el !== sortOldestDate),
                sortNewestDate,
              ];
            });
          }}
        >
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
                    <span className="false"> {String.fromCharCode(10008)}</span>
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
                    <span className="false"> {String.fromCharCode(10008)}</span>
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
