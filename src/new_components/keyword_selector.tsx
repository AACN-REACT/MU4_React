import React from "react";
import tick from "../images/check.png";

import cross  from "../images/SVG/SVG/greyCross.svg";

import { closeAfterAni } from "../utils/close_after_ani";



export function KeywordSelector({ data, deleteData, sendData, close }) {
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
                         <div
                    className="keyword-icon"
                    onClick={(e) => {
                      deleteData(el);
                    }}
                    style={{backgroundImage:`url(${cross})`}}
                  >
                  </div>
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
                    style={{backgroundImage:`url(${cross})`}}
                  >
                  </div>
                </div>
              );
            })
          : () => null}
        <div
          onKeyDown={(e) => {
            e.stopPropagation();

            if (
              e.key === "Enter" &&
              inputValue.current === document.activeElement
            ) {
              sendData(inputValue.current.value);
            }
          }}
        >
          <input ref={inputValue} type="text" placeholder="enter keyword" />
        </div>
        {/* <div
          onClick={(e) => {
            sendData(inputValue.current.value);
          }}
          className="check"
        >
          <img src={tick} />
        </div> */}
      </div>
    </div>
  );
}
