import * as React from "react";

export function Table({ heading, pagesize,list,open }) {
  const [pending, setPending] = React.useState([{}]);
  const [page, setPage] = React.useState({ start: 0, end: 3 });
  React.useEffect(function () {
    fetch("https://localhost:44308/api/v1/MediaManagement")
      .then((res) => res.json())
      .then((info) => {
        console.log("INFO", info.Result);
        return info;
      })
      .then((info) => setPending(info.Result.PendingMediaDetailsDto))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="table-container">
      <table>
        <caption>{heading}</caption>

        <tr>
          <th>Added Date</th>
          <th>Title</th>
          <th>Size</th>
          <th>Status</th>
          <th
            style={{
              width: "100px",
              cursor: "pointer",
              backgroundColor: "lightblue",
            }}
            onClick={function (e) {
              setPage((s) => ({ start: s.start + 3, end: s.end + 3 }));
            }}
          >
            {" "}
            Next Page
          </th>
        </tr>
        {pending.map((el, ind) => {
          if (ind >= page.start && ind < page.end) {
            return (
              <tr>
                {Object.entries(el).map((item) => (
                  <td>{item[1]}</td>
                ))}
              </tr>
            );
          }
          return null;
        })}
      </table>
    </div>
  );
}
