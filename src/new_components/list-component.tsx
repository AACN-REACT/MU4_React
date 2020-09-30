import * as React from "react";

export function ListComponent({
  heading,
  dispatchPanelState,
  panelState,
  videolist,
}) {
  let [list, changelist] = React.useState([]);

  // this memoized function returns a list value for the specific panelState
  const panelStateNumber = panelState[`${heading.toLowerCase()}_container`];
  console.log("PPP", panelStateNumber);
  React.useEffect(() => {
    function ProduceListFromState(panelStateNumber, videolist) {
      console.log("PANEL STATE in Function", panelStateNumber);
      switch (panelStateNumber) {
        case 0:
          return [
            <h1 onClick={(e) => dispatchPanelState({ type: `OPEN PARTIAL` })}>
              {`Click
              to
            Open`}
            </h1>,
          ];
        case 1:
          return videolist.map((el, id) => (
            <div>
              <div className="columns"></div>
              <span>{el.Title}</span>
              <span>{new Date(el.StartDateTime).toDateString()}</span>
            </div>
          ));
        case 2:
          return videolist.map((el, id) => (
            <div>
              <span>{el.Title}</span>
              <span>{new Date(el.StartDateTime).toDateString}</span>
              <span>{el.StartedByUserName}</span>
              <span>{el.OriginalFileName}</span>
            </div>
          ));
        default:
          return [];
      }
    }
    console.log("MY LIST", ProduceListFromState(panelStateNumber, videolist));
    changelist(ProduceListFromState(panelStateNumber, videolist));
    console.log("list", list);
  }, [videolist, panelStateNumber]);

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
          t
        </div>
      </div>
      {list}
    </div>
  );
}
