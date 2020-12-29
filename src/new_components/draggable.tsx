import React from "react";
import ReactDOM from "react-dom";
import { Portal } from "../mediauploader/components/portal";

export function Drag({ children, width="auto", this_panel_state }) {
  const draggContainer = React.useRef();




  function handleMouseDown(event) {
      event.stopPropagation()
    let offsetX =
      event.clientX - draggContainer.current.getBoundingClientRect().left;
    let offsetY =
      event.clientY - draggContainer.current.getBoundingClientRect().top;

    function moveto(event) {
      draggContainer.current.style.left = event.clientX-offsetX+"px";
      draggContainer.current.style.top = event.clientY-offsetY+"px";
    }

    document.addEventListener("mousemove", moveto);

    draggContainer.current.addEventListener("mouseup", function (event) {
      document.removeEventListener("mousemove", moveto);
    });
  }

  React.useEffect(
    function () {
      if (draggContainer.current)
        draggContainer.current.ondragstart = (e) => false;

      return () => {
        draggContainer.current?.removeEventListener(
          "mousedown",
          handleMouseDown
        );
      };
    },
    [draggContainer.current]
  );


  return ReactDOM.createPortal(
    <div ref={draggContainer} className="draggable" style={{width: `${this_panel_state!==2?width:'1000px'}`}} onMouseDown={handleMouseDown}>
      {children}
    </div>, document.getElementById('portal')
  );
}
