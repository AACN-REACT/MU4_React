import * as React from "react";

export function PendingList({ dispatchPanelState, panelState, videolist }) {
  let [list, changelist] = React.useState([]);

  React.useEffect(() => {
    changelist(videolist);
    console.log("list", list);
  }, [videolist]);

  return (
    <div className={`completed-list-${panelState.completed_container}`}>
      {list?.map((el) => (
        <div
          onClick={(e) => dispatchPanelState({ type: "OPEN COMPLETED" })}
          key={el.Key}
        >
          {el.Title}
        </div>
      ))}
    </div>
  );
}
