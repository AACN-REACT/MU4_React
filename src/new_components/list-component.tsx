import * as React from "react";
import butt from "../images/switch.png";
export function ListComponent({
  heading,
  dispatchPanelState,
  panelState,
  videolist,
  setMediaKey,
}) {
  let [list, changelist] = React.useState([]);

  // this memoized function returns a list value for the specific panelState
  const panelStateNumber = panelState[`${heading.toLowerCase()}_container`];
  console.log("PPP", panelStateNumber);
  React.useEffect(() => {
    function ProduceListFromState(panelStateNumber, videolist) {
      console.log("PANEL STATE in Function", panelStateNumber);
      switch (panelStateNumber) {
        case 0:
          return [
            <h1 onClick={(e) => dispatchPanelState({ type: `OPEN PARTIAL` })}>
              {`Click
              to
            Open`}
            </h1>,
          ];
        case 1:
          return (
            <div className="list-wrapper">
              <div key="page" className="row-page">
                <div>prev</div>
                <div>page num</div>
                <div>next</div>
              </div>
              <div className="row-heading" key="randomvalue">
                <div className="column-1">Title</div>
                <div className="column-2">Added By..</div>
                <div className="column-3">Date</div>
              </div>

              {videolist?.map((el, id) => {
                return (
                  <div
                    className={`row-${id}`}
                    onClick={(e) => {
                      dispatchPanelState({
                        type: `OPEN ${heading.toUpperCase()}`,
                      });
                    }}
                  >
                    <div key={el.Title} className="column-1">
                      {el.Title}
                    </div>
                    <div key={el.StartedByUserName} className="column-2">
                      {el.StartedByUserName}
                    </div>
                    <div key={el.StartDateTime} className="column-3">
                      {new Date(el.StartDateTime).toDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        case 2:
          return (
            <div className="list-wrapper">
              <div key="page" className="row-page">
                <div>prev</div>
                <div>page num</div>
                <div>next</div>
              </div>
              <div className="row-heading" key="heading">
                <div key="title" className="column-title">
                  Title
                </div>
                <div key="addedby" className="column-addedby">
                  Added By..
                </div>
                <div key="keywords" className="column-keywords">
                  Has Keywords?
                </div>
                <div key="netforum" className="column-netforum">
                  Linked to Netforum
                </div>
                <div key="status" className="column-status">
                  Status
                </div>
                <div key="date" className="column-date">
                  Date
                </div>
              </div>

              {videolist.map((el, id) => {
                return (
                  <div
                    key={`${el.Key}`}
                    onClick={(e) => {
                      setMediaKey(el.Key);
                      dispatchPanelState({ type: "OPEN DETAILS CLOSE OTHERS" });
                    }}
                    className={`row-${id}`}
                  >
                    <div key={el.Title} className="column-full-title">
                      {el.Title}
                    </div>
                    <div
                      key={el.StartedByUserName}
                      className="column-full-addedby"
                    >
                      {el.StartedByUserName}
                    </div>
                    <div key="mykeywords" className="column-full-keywords">
                      {el.Keywords.length > 0 ? "True" : "False"}
                    </div>
                    <div key="netforum" className="column-full-keywords">
                      {el.NetforumItemLink.NetforumKey.length > 0
                        ? "True"
                        : "False"}
                    </div>
                    <div key={el.Status} className="column-full-status">
                      {el.Status}
                    </div>
                    <div key={el.StartDateTime} className="column-full-date">
                      {new Date(el.StartDateTime).toDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        default:
          return [];
      }
    }
    console.log("MY LIST", ProduceListFromState(panelStateNumber, videolist));
    changelist(ProduceListFromState(panelStateNumber, videolist));
    console.log("list", list);
  }, [videolist, panelStateNumber]);

  return (
    <div className={`list-${panelStateNumber}`}>
      <div className="list-heading">
        <div>{heading}...</div>
        <div
          onClick={(e) => {
            dispatchPanelState({
              type:
                panelStateNumber === 0 || panelStateNumber === 2
                  ? "OPEN PARTIAL"
                  : `OPEN ${heading.toUpperCase()}`,
            });
          }}
          className="switch"
        >
          <img src={butt} />
        </div>
      </div>
      {list}
    </div>
  );
}
