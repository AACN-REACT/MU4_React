import * as React from "react";

export function PendingList({ dispatchPanelState, panelState }) {
  return (
    <div className={`pending-list-${panelState.pending_container}`}>
      <ul>
        <li onClick={(e) => dispatchPanelState({ type: "OPEN PENDING" })}>
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
