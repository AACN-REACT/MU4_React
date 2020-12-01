import React from 'react';




export function KeywordSelector({isEditable, data, deleteData, sendData}){

const inputValue = React.useRef();





    return (
        <div className="netforum-selector">
        <div className="keyword-input-container">
          {Array.isArray(data)
            ? data.map((el, indx, data) => {
                return (
                  <div className="keyword-popup">
                    <div className="keyword-name">{el}</div>

                    <div
                      className="keyword-icon"
                      onClick={(e) => {
                        deleteData(el);
                      }}
                    >
                      {String.fromCharCode(10008)}
                    </div>
                  </div>
                );
              })
            : () => null}
          <input ref={inputValue} type="text" placeholder="enter keyword" />
          <div
            onClick={(e) => {
              sendData(inputValue.current.value);
            }}
            className="check"
          >
            <img src={tick} />
          </div>
        </div>
      </div>
    )


}