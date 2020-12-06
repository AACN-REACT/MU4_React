import React from "react";
import {LoaderOne} from './loader_ani_1'

export function NonEditableField({
  isDetailsLoading,
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
    data = Object.keys(data?{...data.NetforumType, ...data.NetforumCode}:{});
  }

  return (
    <div className="field-container">
      <div className="detail-name">{displayName}</div>
      {isDetailsLoading?<LoaderOne diameter={10} numberOfCells={5}    />:<div className="detail-value">{data}</div>}
    </div>
  );
}
