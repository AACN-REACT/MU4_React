import * as React from "react";

export function MediaList({ list, pageNumber }) {
  React.useEffect(
    function () {
      if (list !== "loader") {
        console.log("NO LOADER", list);
        setGeneratedList([
          <div className="list" key={pageNumber}>
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
      } else {
        console.log("YAy", list);
        setGeneratedList([
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
        ]);
      }
    },
    [pageNumber, list]
  );
  console.log("Generated", list);
  let [generatedList, setGeneratedList] = React.useState([
    <div>loading...</div>,
  ]);

  return (
    <div className="list">
      hello
      {generatedList}
    </div>
  );
}
