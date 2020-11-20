import React from "react";
import { ControlButton } from "./control_button";
export function Controls({ heading, dispatcher }) {
  const [openState, changeOpenState] = React.useState(0);

  return (
    <div className="control-container">
      <div className="control-heading">
        <div className="heading">{heading}</div>
        <ControlButton dispatcher />
      </div>
    </div>
  );
}
