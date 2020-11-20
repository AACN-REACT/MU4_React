import React from "react";

export function Triptych(props) {
  return (
    <div className="triptych">
      {React.Children.map(props.children, (child, i) => (
        <div className="triptych-panel" key={i}>
          {child}
        </div>
      ))}
    </div>
  );
}
