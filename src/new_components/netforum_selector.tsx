import * as React from "react";

export function NetforumSelector({
  typeEndpoint,
  selectEndpoint,
  token,
  close,
}) {
  const [nfTypes, setNfTypes] = React.useState([]);
  const [nfOptions, setNfOptions] = React.useState([]);
  const [nfSelction, setNfSelection] = React.useState([]);
  const [validSearch, setValidSearch] = React.useState(false);

  const onchange = function (type, search) {
    if (search.length > 2) {
      setValidSearch(true);
      fetch(
        `https://localhost:44340/api/v0/NetforumItems/NetForumItems?netForumType=${type}&searchText=${encodeURI(
          search
        )}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setNfOptions(res.Result.NetforumItemDtos);
          console.log("RETURN ITEMS", nfOptions);
        })
        .catch((err) => {
          console.log("RETURN ITEMS", err);
        });
    } else {
      setValidSearch(false);
    }
  };
  React.useEffect(function () {
    fetch(typeEndpoint + "ContentTypes", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(function (res) {
        if (res.status === 401) {
          throw new Error("Network Error, probably unauthorised");
        }
        return res.json();
      })
      .then((res) =>
        res.Result.NetforumContentTypes.forEach((el, ind, arr) => {
          setNfTypes((t) => [...t, el.NetforumType]);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  console.log("selection", nfSelction);
  return (
    <div onClick={(e) => null /*close()*/} className="netforum-selector">
      <div>
        <div>Type</div>
        <select
          onChange={(e) => {
            e.stopPropagation();
            setNfSelection(e.target.value);
          }}
        >
          {nfTypes.map((el) => (
            <option value={el}>
              {el === "CEActivity" ? `CE Activity` : el}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>Keyword</div>
        <input
          autofocus="true"
          className={validSearch ? "valid-input" : "invalid-input"}
          type="text"
          onChange={(e) => {
            e.stopPropagation();
            onchange(nfSelction, e.target.value);
          }}
        />
        <div>Select</div>
        <select
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {nfOptions.map((el) => (
            <option>{el.NetforumCode}</option>
          ))}
        </select>
        <button>Add</button>
      </div>
    </div>
  );
}
