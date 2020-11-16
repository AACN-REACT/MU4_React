import * as React from 'react'


export function ListContent(listItem){


    return (
        <div className="cotent-rows">
        <div className="content-columns">
                <div className="list-cell">{listItem.Title}</div>
                <div className="list-cell">{listItem.OriginalFileName}</div>
                <div className="list-cell">{listItem.HasKeywords}</div>
                <div className="list-cell">{listItem.StartedByUserName}</div>
                <div className="list-cell">{listItem.Title}</div>
                <div className="list-cell">{listItem.Title}</div>
                <div className="list-cell">{listItem.Title}</div>
                <div className="list-cell">{listItem.Title}</div>
                <div className="list-cell">{listItem.StartDateTime}</div>
        </div>
        </div>
    )



}