import React from "react";

export function Tooltip({ tooltipMsg }) {
  const thisPos = React.useRef();

  return (
    <div ref={thisPos} className="tooltip" style={tooltipMsg.ttStyles}>
      {tooltipMsg.message}
    </div>
  );
}