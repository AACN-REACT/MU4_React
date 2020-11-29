import React from "react";

import { Paginate } from "../utils/sorting/sorting_algorithms";

export function NFTable({
  options,
  itemKey,
  postLink,
  nfCode,
  nfKey,
  setNFlinkInfo,
  nfType,
}) {
  const [selected, setSelected] = React.useState("");
  const [fadeIn, setFadeIn] = React.useState(false);
  const [pages, setPages] = React.useState([[]]);
  const [pageNumber, setPageNumber] = React.useState(0);

  React.useEffect(
    function () {
      setPages(Paginate(options, 3));
    },
    [options]
  );

  React.useLayoutEffect(function () {
    setFadeIn(true);
  });

  return fadeIn ? (
    <div className="nf-table">
      <div onClick={(e) => setPageNumber((s) => s + 1)}>Next</div>
      <div onClick={(e) => setPageNumber((s) => s - 1)}>Previous</div>
      <div>
        Selected <div>{selected!==""?selected.Name:"Nothing selected"}</div>
      </div>
      <div className="nf-table-heading"></div>
      {pages[pageNumber]?.map((el) => {
        return (
          <div
            className={
              selected.NetforumKey === el.NetforumKey
                ? "selected-nf-table-cell"
                : "nf-table-cell"
            }
          >
            <div className="nf-table-cell-name">{el.Name}</div>
            <div className="nf-table-cell-code">{el.NetforumCode}</div>
            <div className="nf-table-cell-key">{el.NetforumKey}</div>
            <div
              className="nf-table-cell-select"
              onClick={(e) => setSelected(el)}
            >
              select
            </div>
          </div>
        );
      })}
      <button
        onClick={(e) =>
          postLink({
            key: itemKey,
            nfCode: selected.NetforumCode,
            nfKey: selected.NetforumKey,
            nfType: selected.NetforumType,
          })
        }
      >
        Create Link
      </button>
    </div>
  ) : null;
}
