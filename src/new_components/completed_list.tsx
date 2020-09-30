import * as React from "react";

export function CompletedList({ dispatchPanelState, panelState, videolist }) {
  let [list, changelist] = React.useState([]);

  // this memoized function returns a list value for the specific panelState

  React.useEffect(() => {
    function ProduceListFromState(panelState, videolist) {
      console.log("PANEL STATE in Function", panelState);
      switch (panelState.completed_container) {
        case 0:
          return [
            <h1 onClick={(e) => dispatchPanelState({ type: "OPEN COMPLETED" })}>
              Click
            </h1>,
          ];
        case 1:
          return videolist.map((el, id) => (
            <div>
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
    console.log("MY LIST", ProduceListFromState(panelState, videolist));
    changelist(ProduceListFromState(panelState, videolist));
    console.log("list", list);
  }, [videolist, panelState]);

  return (
    <div className={`completed-list-${panelState.completed_container}`}>
      {list}
    </div>
  );
}
