import * as React from 'react';






export function Tooltip({tooltipMsg}){

    const thisPos = React.useRef()

console.log("tooltip", thisPos.current, tooltipMsg)
return <div ref={thisPos} className="tooltip"  style={tooltipMsg.ttStyles}>{tooltipMsg.message}</div>


} 