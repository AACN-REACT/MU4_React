import * as React from "react";
import {IdleList, LoadingList} from './listAlternateStates'
import {ListContent} from './listContent'
export function MediaList({ list, pageNumber }) {

 
let [output, setOutput]=React.useState(<IdleList />)

 React.useEffect(

   function(){

    switch(typeof list){
      case "string":
        if(list==="idle"){
          setOutput(<IdleList />)
          break;
        }
        else if(list==="loading"){
          setOutput(<LoadingList/>)
          break;
        }
      case "object":
        console.log("hola", list)
        setOutput(list.map(el=><ListContent listItem={el}/>))
      break;
      default: setOutput(<IdleList />)
    }
},[list])
   console.log("OP",list)
  return (
    <div className="list-content" >
      {output}
    </div>
  )
}