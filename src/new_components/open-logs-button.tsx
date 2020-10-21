import * as React from "react";


export function OpenLogs({
  method = "GET",
  setter,
  endpoint,
  name,
  displayName,
  data,
  user,
  itemKey,
  itemName,
}) {


  return (
    <div className="field-container">
      <div className="open-logs">Open Logs</div>
        <div className="open-logs-button">

        </div>
    </div>
  );
}
