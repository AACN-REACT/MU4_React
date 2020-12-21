import React from "react";
import ReactDOM from "react-dom";
import { Portal } from "../mediauploader/components/portal";

export function Drag({ children, width=null }) {
  const draggContainer = React.useRef();




  function handleMouseDown(event) {
      event.stopPropagation()
    let offsetX =
      event.clientX - draggContainer.current.getBoundingClientRect().left;
    let offsetY =
      event.clientY - draggContainer.current.getBoundingClientRect().top;
      console.log("TARGET 3", event.clientX, event.clientY)

    function moveto(event) {
        console.log("TARGET",draggContainer.current)
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
    <div ref={draggContainer} className="draggable" style={{width: width}} onMouseDown={handleMouseDown}>
      {children}
    </div>, document.getElementById('portal')
  );
}
