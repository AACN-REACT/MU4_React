



export function toolTipSetter(e, setter, message, reveal){

e.preventDefault();
let pos = e.target.getBoundingClientRect();
let mousePos = {right:e.clientX, y:e.clientY}
setter({ttStyles:{left:mousePos.right+10+"px", top:mousePos.y-10+"px",opacity:reveal?1:0}, message})


}