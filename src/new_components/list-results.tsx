import React from "react";

export function ListResults({
  list,
  pageNumber,
  panelStateNumber,
  setMediaKey,
}) {
  const [PageContent, setPageContent] = React.useState(list[pageNumber]);
  const slider = React.useRef();
  const PrevPageNumber = React.useRef(0);
  const renderedList = React.useMemo(
    function () {
      const direction = PrevPageNumber.current >= pageNumber
      return  ( <div>  
           { PageContent.map((el) => (
                        <div className="slider" 
                        style={{
                            position: "relative",
                            left: `${pageNumber * 100}%`,
                            animationName: direction?"slideLeft":"slideRight",
                        }}
                        key={el.key}
                        >
                        {el.Key}
                        </div>
      )) }</div> );
    },
    [PageContent]
  );

  React.useEffect(
    function () {
      function onSlideEnd(e) {
        setPageContent(list[pageNumber]);
      }
      console.log("ape shit", slider.current);
      slider.current.addEventListener("transitionend", onSlideEnd);

      return () => {
        slider.current.removeEventListener("transitionend", onSlideEnd);
      };
    },
    [pageNumber, list]
  );

  React.useEffect(
    function () {
    
      return ()=>PrevPageNumber.current = pageNumber;

    },
    [pageNumber, list]
  );
  console.log("ape", PageContent);
  return (
    <div
      ref={slider}
      className={`paged-list`}
      style={{
        width: `${(list.length + 1) * 100}%`,
        left: `-${pageNumber * 100}%`,
      }}
    >
      <h1>hello</h1>
      {renderedList}
    </div>
  );
}
