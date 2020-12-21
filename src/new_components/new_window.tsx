import React from "react";
import {Drag} from './draggable'
import ReactDOM from "react-dom";

export function NewWindow({ children }) {
  
  const Container= React.useMemo(()=>document.createElement('div'),[children])


  React.useEffect(
    function () {

          document.body.appendChild(Container);
          return ()=>{   Container.remove() }
    },
    [children]
  );

  return ReactDOM.createPortal(<Drag width="900px">{children}</Drag>, Container);
}
