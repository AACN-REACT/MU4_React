import React from "react";

export function OpenLogs({ data = [] }) {
  const [open, toggleOpen] = React.useState(false);
  return (
    <div className="logs-container" onClick={() => null}>
      <div className="details-bar">Logs</div>
      <div className="row-heading">
        <span>{String.fromCharCode(8986)}</span>
        <span>key</span>
        <span>action</span>
        <span>author</span>
      </div>

      {data.map((el) => (
        <div className="row-log">
          <div>{new Date(el.DateTime).toDateString()}</div>
          <div>{el.Key}</div>
          <div>{el.Action}</div>
          <div>{el.Username}</div>
        </div>
      ))}
    </div>
  );
}
