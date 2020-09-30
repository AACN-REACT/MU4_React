import * as React from "react";

export function PendingList({ dispatchPanelState, panelState, videolist }) {
  let [list, changelist] = React.useState([]);

  React.useEffect(() => {
    changelist(videolist);
    console.log("list", list);
  }, [videolist]);

  return (
    <div className={`completed-list-${panelState.pending_container}`}>
      <div className="list-heading">
        <div>{heading}</div>
        <div className="switch"></div>
      </div>
      {list?.map((el) => (
        <div
          onClick={(e) => dispatchPanelState({ type: "OPEN PENDING" })}
          key={el.Key}
        >
          {el.Title}
        </div>
      ))}
    </div>
  );
}
