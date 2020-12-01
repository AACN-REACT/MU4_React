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
      
      <PageControls
        changePageNumber={setPageNumber}
        list={pages}
        pageNumber={pageNumber}
      />
      <div className="nf-table-heading">
        {activeFields.map(el=><div className={`nf-table-heading-${el}`}>{el}</div>)   }
      </div>


    <div className="nf-cell-container">
      {pages[pageNumber]?.map((el) => {
        return (
          <div
          onClick={(e) =>{selected.NetforumKey !== el.NetforumKey ?setSelected(el):setSelected("")}}
            className={
              selected.NetforumKey === el.NetforumKey
                ? "selected-nf-table-cell"
                : "nf-table-cell"
            }
          >{activeFields.map((item,ind,arr)=><div style={{fontSize:`${(70/arr.length)+.5}px`}}>{el[item]}</div>)}
          </div>
        );
      })}
      </div>
      <div className="display-nf-selection">
        <div>Selected: {" "}</div>
        <div className="selected-nf-info">{selected !== "" ? `${selected.NetforumType } , ${selected.NetforumCode} , ${selected.Name} ` : "Nothing selected"}</div>
      </div>
      <div
      className="create-nf-link"
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
      </div>
    </div>
  ) : null;
}
