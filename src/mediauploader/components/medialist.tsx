import * as React from "react";

export function MediaList({ list, pageNumber }) {

  console.log("List passed to Medialist", list)
  let [generatedList, setGeneratedList] = React.useState(
    [
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
      <div>Loading</div>,
    ]
  );


  React.useEffect(
    function () {

      if (Array.isArray(list)) {
        console.log("NO LOADER", list[0])
        setGeneratedList([
          <div className="inner-list" key={pageNumber}>
            {list.length > 0
              ? list.map((item) => (
                  <div className="row">
                    <span>{item.StartDateTime}</span>
                    <span>{item.StartedByUsername}</span>
                  </div>
                ))
              : null}
          </div>,
        ]);
      } else  {
        console.log("YAy", list);
        list==="loading"?setGeneratedList([
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
          <div>Loading</div>,
        ]):
        setGeneratedList([
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
          <div>idle</div>,
        ])
      }
    },
    [pageNumber, list]
  );
  console.log("Generated", generatedList);


  return (
    <div className="list"     style={{
      width: `${(list.length + 1) * 100}%`,
      left: `-${pageNumber * 100}%`,
    }}>
      hello
      {generatedList}
    </div>
  );
}
