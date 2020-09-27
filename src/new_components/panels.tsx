import * as React from "react";

export function Panels(props) {
  const Panels = React.Children.map((el) => React.cloneElement(el));

  return (
    <div className="panel-container">
      {Panels.map(function (el, ind) {
        <div className="panel" key={ind} type={ind}>
          {el}
        </div>;
      })}
    </div>
  );
}
