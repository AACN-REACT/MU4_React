import React from "react";
import butt from "../images/switch.png";
import { ListStructure } from "./ListStructure";
import { ListResult } from "./ListResult";
import { ManagementList } from "./managementlist";
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
import Worker from "../utils/sorting/pendingList.worker";
import { LoaderOne, LoaderThree } from "./loader_ani_1";
import { SearchCriteria } from "./search_criteria";
import { Switch } from "./switch-list";

export function ListComponent({
  setFloat,
  heading,
  dispatchPanelState,
  panelState,
  videolist,
  setMediaKey,
  worker,
  isLoading,
  refreshList,
  floatInfo
}) {
  //not sure what this does just yet
  let [list, changeList] = React.useState([]);

  let [searchCriteria, setSearchCriteria] = React.useState("Title");
  let [criteriaOpen, setCriteriaOpen] = React.useState(false);

  const [transforms, setTransforms] = React.useState([sortNewestDate]);
  const [SORTING_WORKER] = React.useState(Worker);
  SORTING_WORKER.onmessage = function (e) {
    console.log("WORKER: ANSWER RETURNED", e.data);
    changeList(Paginate(e.data, 10));
  };

  console.log("tt", transforms);

  const searchValue = React.useRef();
  const searchbar = React.useRef();

  const [pageNumber, changePageNumber] = React.useState(0);
  // this extaract the number for the specific panelState
  const panelStateNumber = panelState[`${heading.toLowerCase()}_container`];
  const [enterNumber, toggleEnterNumber] = React.useState(false);

  const [sortPriority, setSortPriority] = React.useState([]);

  const [toggleSortPriority, changeSortPriorityToggle] = React.useState(false);

  let currentSort = "";

  const numberInput = React.useRef();
  React.useEffect(() => {
    let internalList = [];
    transforms.length > 0
      ? transforms.forEach((func) => {
          internalList = videolist.sort(func);
        })
      : (internalList = videolist);
    changeList(Paginate(internalList, 10));
  }, [videolist, transforms]);

  // React.useEffect(
  //   function(){
  //     let mysort = currentSort
  //       setSortPriority(s=>{return [mysort,...s]})
  //   },[toggleSortPriority]
  // )

  return (
    <div className={`list-${panelStateNumber}`}>
      <div className="list-heading" onDoubleClick={e=>setFloat(s=>!s)}>
        <div>{heading}...</div>
        {/* <div
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
        </div> */}
        <Switch
          floatInfo={floatInfo}
          dispatchPanelState={dispatchPanelState}
          panelStateNumber={panelStateNumber}
          heading={heading}
        />
      </div>
      <div className="list-controls">
        <div className="search-bar" ref={searchbar}>
          <label>Search</label>
          <input
            onFocus={(e) => setCriteriaOpen(true)}
            onChange={(e) => {
              if (searchValue.current.value === "") {
                refreshList((l) => !l);
              }
              SORTING_WORKER.postMessage({
                word: searchValue.current.value,
                list: videolist,
                field: searchCriteria,
              });
            }}
            type="text"
            ref={searchValue}
            className="search"
          />
          {criteriaOpen && panelState.details_container !== 2 ? (
            <SearchCriteria
              worker={SORTING_WORKER}
              searchValue={searchValue}
              searchbar={searchbar.current}
              setCriteriaOpen={setCriteriaOpen}
              setSearchCriteria={setSearchCriteria}
              videolist={videolist}
            />
          ) : null}
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
          <div>
            Page{" "}
            <span
              onDoubleClick={(e) => {
                toggleEnterNumber((t) => !t);
                if (enterNumber) {
                  numberInput.current.focus();
                }
              }}
            >
              {enterNumber ? (
                <input
                  ref={numberInput}
                  type="number"
                  onChange={(e) => {
                    changePageNumber(Number(e.target.value) - 1);
                  }}
                  max={`${list.length + 1}`}
                  min={1}
                ></input>
              ) : (
                parseInt(pageNumber) + 1
              )}
            </span>{" "}
            of {list.length}{" "}
          </div>
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
      </div>

      <div className="inner-container-heading">
        <div
          key="title"
          style={{
            color:
              sortPriority.indexOf("Title") !== -1
                ? `rgb(${254 - sortPriority.indexOf("Title") * 50}, ${
                    0 + sortPriority.indexOf("Title") * 50
                  }, 0)`
                : `#005496`,
          }}
          className="column-title-heading"
          onClick={function (e) {
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Title", ...s];
              });
            }
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
          Title{" "}
        </div>
        <div
          style={{
            color:
              sortPriority.indexOf("Original Filename") !== -1
                ? `rgb(${
                    254 - sortPriority.indexOf("Original Filename") * 50
                  }, ${0 + sortPriority.indexOf("Original Filename") * 50}, 0)`
                : `#005496`,
          }}
          key="original"
          className={
            panelStateNumber === 2
              ? "column-original-heading column-double-line"
              : "column-close"
          }
          onClick={function (e) {
            currentSort = "Original Filename";
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Original Filename", ...s];
              });
            }
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
          className={`column-addedBy-heading ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Added By..", ...s];
              });
            }
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
          className="column-size-heading"
          onClick={function (e) {
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Size", ...s];
              });
            }
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
          <p
            style={{
              color:
                sortPriority.indexOf("Size") !== -1
                  ? `rgb(${254 - sortPriority.indexOf("Size") * 50}, ${
                      0 + sortPriority.indexOf("Size") * 50
                    }, 0)`
                  : `#005496`,
            }}
          >
            Size
          </p>
          <span
            style={{
              color:
                sortPriority.indexOf("Size") !== -1
                  ? `rgb(${254 - sortPriority.indexOf("Size") * 50}, ${
                      0 + sortPriority.indexOf("Size") * 50
                    }, 0)`
                  : `#005496`,
            }}
          >
            MB
          </span>
        </div>
        <div
          style={{
            color:
              sortPriority.indexOf("Has Keywords?") !== -1
                ? `rgb(${254 - sortPriority.indexOf("Has Keywords?") * 50}, ${
                    0 + sortPriority.indexOf("Has Keywords?") * 50
                  }, 0)`
                : `#005496`,
          }}
          key="keywords"
          className={`column-keywords-heading ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Has Keywords?", ...s];
              });
            }
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
          className={`column-netforum-heading column-double-line ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
          onClick={function (e) {
            if (e.shiftKey) {
              setSortPriority((s) => {
                return [];
              });
            } else {
              setSortPriority((s) => {
                return ["Linked to Netforum", ...s];
              });
            }
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
          className={`column-status-heading ${
            panelStateNumber === 2 ? "" : "column-close"
          }`}
        >
          Status
        </div>
        <div
          key="date"
          className="column-date-heading"
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
      {isLoading ? (
        <div className="flex-rows" style={{ perspective: `${700}px` }}>
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          <LoaderThree delay={Math.random()} />
          {/* <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/>
          <LoaderOne/> */}
        </div>
      ) : (
        <div
          className={`paged-list`}
          style={{
            width: `${(list.length + 1) * 100}%`,
            left: `-${pageNumber * 100}%`,
          }}
        >
          <ManagementList
            changePageNumber={changePageNumber}
            list={list[pageNumber]}
            pos={`${pageNumber * 100}%`}
            pageNumber={pageNumber}
            panelStateNumber={panelStateNumber}
            setMediaKey={setMediaKey}
            dispatchPanelState={dispatchPanelState}
          />
        </div>
      )}
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
