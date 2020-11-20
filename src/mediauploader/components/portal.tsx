import React from "react";
import ReactDOM from "react-dom";

export function Portal({ root, children }) {
  // const portalNode = document.createElement('div');

  // portalNode.id = "portal";

  // document.body.appendChild(portalNode)

  // let nodeRef=React.useRef(portalNode)

  const portalNode = document.getElementById(root);

  //let childWithRef = React.Children.map(props.children,el=>React.cloneElement(el,{nodeRef:nodeRef.current}))
  return ReactDOM.createPortal(children, portalNode);
}
