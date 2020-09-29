import * as React from "react";

export function CompletedList({ dispatchPanelState, panelState, videolist }) {
  let [list, changelist] = React.useState([]);

  React.useEffect(() => {
    changelist(videolist.Result.FinalizedMediaDetailsDto);
    console.log("list", list);
  }, []);

  return (
    <div className={`completed-list-${panelState.completed_container}`}>
      {list.map((el) => (
        <div key={el.Key}>{el.Title}</div>
      ))}
    </div>
  );
}
