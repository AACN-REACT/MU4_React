import React from "react";
import tick from "../images/check.png";

import { closeAfterAni } from "../utils/close_after_ani";

export function KeywordSelector({  data, deleteData, sendData, close }) {
  const [toggleAniCleanUp, setToggleAniCleanUp] = React.useState(false);
  const slideAnimationRef = React.useRef();
  const inputValue = React.useRef();

  return (
    <div ref={slideAnimationRef} className="netforum-selector">
         <div
        className="toggle-inputbox"
        onClick={(e) => {
          closeAfterAni(
            slideAnimationRef.current,
            close,
            toggleAniCleanUp,
            setToggleAniCleanUp
          );
        }}
      >
        close..
      </div>
      <div className="keyword-input-container">
        {Array.isArray(data)
          ? data.map((el, indx, data) => {
              return (
                <div key={el} className="keyword-popup">
                  <div className="keyword-name">{el}</div>

                  <div
                    className="keyword-icon"
                    onClick={(e) => {
                      deleteData(el);
                    }}
                  >
                    {String.fromCharCode(9986)}
                  </div>
                </div>
              );
            })
          : () => null}
        <input  ref={inputValue} type="text" placeholder="enter keyword" />
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
  );
}
