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
  return (
    <div className="field-container">
      <div className="detail-name">{displayName}</div>
      <div className="detail-value">{data}</div>
    </div>
  );
}
