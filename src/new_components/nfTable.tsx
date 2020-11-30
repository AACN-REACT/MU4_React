import React from "react";

import { Paginate } from "../utils/sorting/sorting_algorithms";
import { PageControls } from "./page-controls";

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
  const [activeFields, setActiveFields] = React.useState()

  function getActiveFields(){
    let entries=[];
    if(options?.length>0){ entries = Object.entries(options[0]).filter(el=>el[1]!=="").map(el=>el[0])}
    console.log("options entries", entries)
    return entries
  }



React.useEffect(
  function(){
    setActiveFields(getActiveFields())
  },[options]
)



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
      <div>
        Selected{" "}
        <div>{selected !== "" ? selected.Name : "Nothing selected"}</div>
      </div>
      <PageControls
        changePageNumber={setPageNumber}
        list={pages}
        pageNumber={pageNumber}
      />
      <div className="nf-table-heading">
        {activeFields.map(el=><div className={`nf-table-heading-${el}`}>{el}</div>)   }
      </div>

      {pages[pageNumber]?.map((el) => {
        return (
          <div
          onClick={(e) => setSelected(el)}
            className={
              selected.NetforumKey === el.NetforumKey
                ? "selected-nf-table-cell"
                : "nf-table-cell"
            }
          >{activeFields.map(item=><div>{el[item]}</div>)}
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
