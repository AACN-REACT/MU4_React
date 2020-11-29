import React from "react";

export function NonEditableField({
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
  if (name === "NetforumLink") {
    data = Object.values(data?{...data.NetforumType, ...data.NetforumCode}:{});
  }

  return (
    <div className="field-container">
      <div className="detail-name">{displayName}</div>
      <div className="detail-value">{data}</div>
    </div>
  );
}
