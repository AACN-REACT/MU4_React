import * as React from 'react';
import * as ReactDOM from 'react-dom'



export function Portal(props){


// const portalNode = document.createElement('div');

// portalNode.id = "portal";

// document.body.appendChild(portalNode)

// let nodeRef=React.useRef(portalNode)

const portalNode = document.getElementById('portal')


//let childWithRef = React.Children.map(props.children,el=>React.cloneElement(el,{nodeRef:nodeRef.current}))
return ReactDOM.createPortal(props.children, portalNode)


}