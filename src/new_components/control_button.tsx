import * as React from 'react'



export function ControlButton({dispatcher,state,changeState}){




    return (

        <div className="outer-ring">
            <div  onClick={dispatcher} className="inner-ring"></div>
        </div>
    )
}