import React from 'react';



export function PageControls({changePageNumber,list, pageNumber}) {

        const numberInput = React.useRef();
        const [enterNumber, toggleEnterNumber] = React.useState(false);


    return(
        <div className="page-controls" style={{color:"white"}}>
        <div
        onClick={(e) =>
        changePageNumber((s) => {
        if (s > 0) {
        return s - 1;
        }
        return s;
        })
        }
        >
        {String.fromCharCode(9664)}
        </div>
        <div>
        Page{" "}
        <span
        onDoubleClick={(e) => {
        toggleEnterNumber((t) => !t);
        if (enterNumber) {
        alert(numberInput.current);
        numberInput.current.focus();
        }
        }}
        >
        {enterNumber ? (
        <input
        ref={numberInput}
        type="number"
        onChange={(e) => {
        changePageNumber(Number(e.target.value) - 1);
        }}
        max={`${list.length + 1}`}
        min={1}
        ></input>
        ) : (
        parseInt(pageNumber) + 1
        )}
        </span>{" "}
        of {list.length}{" "}
        </div>
        <div
        onClick={(e) =>
        changePageNumber((s) => {
        if (s < list.length - 1) {
        return s + 1;
        }
        return s;
        })
        }
        >
        {String.fromCharCode(9658)}
        </div>
        </div>
    )
}