import * as React from 'react'
import { Controls } from './controls'
import { ControlButton } from './control_button'
import { Dummy } from './dummy'



export function DetailsPage({mediaKey, panelState, dispatchPanelState}){



    console.log("PANEL STATE", panelState)
    return (
        <div className="details-page">
            <button onClick={e=>{panelState.details_container===0?dispatchPanelState({type:"OPEN DETAILS CLOSE OTHERS"}):dispatchPanelState({type:"CLOSE DETAILS OPEN OTHER"})}} />
        <Dummy msg="hello" />





        </div>
    )




}