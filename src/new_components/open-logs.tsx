import React from "react";
import { Paginate } from "../utils/sorting/sorting_algorithms";
import {
  sortNewestLogDate,
  sortOldestLogDate,
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
export function OpenLogs({ data }) {
  let [list, changeList] = React.useState([""]);
  let [ascending, setAscending] = React.useState(true);
  const [transforms, setTransforms] = React.useState([
    //sortTitle,
    // sortFileSize,
    // sortNewestDate,
  ]);

  React.useEffect(() => {
    // let internalList = [];
    // transforms.length > 0
    //   ? transforms.forEach((func) => {
    //       internalList = data?.sort(func);
    //     })
    //   : (internalList = data);
    // changeList(internalList);
    changeList(data?.sort(ascending ? sortOldestLogDate : sortNewestLogDate));
  }, [data, ascending]);

  return (
    <div className="logs-container" onClick={() => null}>
      <div className="log-sticky">
        <div className="logs-title">LOGS </div>
        <div className="logs-table-header">
          <div
            onClick={function (e) {
              setAscending((s) => !s);

              // setTransforms((t) => {
              // if (t.indexOf(sortNewestLogDate) > -1) {
              // return [
              // ...t.filter((el) => el !== sortNewestLogDate),
              // sortOldestLogDate,
              // ];
              // }
              // return [
              // ...t.filter((el) => el !== sortOldestLogDate),
              // sortNewestLogDate,
              // ];
              // });
            }}
          >
            <span className={ascending ? "ascending" : "descending"}>
              {" " + String.fromCharCode(9660)}{" "}
            </span>{" "}
            Date
          </div>
          <div>Action</div>
          <div>Notes</div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>Author</div>
        </div>
      </div>

      <div className="logs-table-body">
        {list?.map((el) => (
          <div key={el.Key} className="logs-table-row">
            <div>{new Date(el.DateTime).toDateString()}</div>
            <div>{el.Action}</div>
            <div>{el.Notes}</div>
            <div>{el.Username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
