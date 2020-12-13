import React from 'react';




export function DropFiles({setDropEffectVisible, coordinates}){

    const drop = React.useRef()
    let position = {position:"absolute",left:`${coordinates.x-1000}px`, top:`${coordinates.y-200}px`}
    let position2 = {position:"absolute", top:`0px`, left:`0px`}


React.useEffect(function(){
   drop.current.addEventListener('animationend',function(e){setDropEffectVisible(false)})

  return ()=>{drop.current.removeEventListener('animationend',function(e){setDropEffectVisible(false)} )}
},[]
)

    return(
   <div ref={drop} style={position} className="ring-1">
       <div className="ring-2">
           <div className="ring-3"></div>
       </div>
   </div>
    )
}