import React from 'react'

import {Paginate} from '../utils/sorting/sorting_algorithms'






export function NFTable({options}){


    const [pages, setPages] = React.useState([[]])
    const [pageNumber, setPageNumber] = React.useState(0)

    
 React.useEffect(
     function (){
         setPages(Paginate(options,3))
     },[options]
 )
    return (
        <div clasName="nf-table">
            <div onClick={e=>setPageNumber(s=>s+1)}>Next</div>
            <div onClick={e=>setPageNumber(s=>s-1)}>Previous</div>
            <div className="nf-table-heading"></div>
            {
                pages[pageNumber]?.map(el=>{
                    return (
                        <div className="nf-table-cell"><div>{el.Name}</div><div>{el.NetforumCode}</div><div>{el.NetforumKey}</div><div>select</div></div>
                    )
                })
            }
        </div>
    )







}