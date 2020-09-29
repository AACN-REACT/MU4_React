import * as React from "react";

export function CompletedList({ dispatchPanelState, panelState }) {
  return (
    <div className={`completed-list-${panelState.pending_container}`}>
      <ul>
        <li onClick={(e) => dispatchPanelState({ type: "OPEN COMPLETED" })}>
          one
        </li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
        <li>five</li>
        <li
          onClick={(e) =>
            dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" })
          }
        >
          six
        </li>
        <li>seven</li>
        <li>eight</li>
      </ul>
    </div>
  );
}
