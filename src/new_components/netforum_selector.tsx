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

  //   const onchange=function(e){
  //       fetch("https://localhost:44340/api/v0/NetforumItems/NetForumItems?netForumType=Webinar&searchText=covid")
  //       .then(res=>res.json)
  //       .then(res=>{ res.Result.NetforumItemDtos.forEach((el,ind,arr) => {
  //         setNfOptions((t) => [...t, el.NetforumCode]);
  //       })
  //   }
  // }
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

  return (
    <div onClick={(e) => close()} className="netforum-selector">
      <div>
        <div>Type</div>
        <select onClick={(e) => e.stopPropagation()}>
          {nfTypes.map((el) => (
            <option>{el === "CEActivity" ? `CE Activity` : el}</option>
          ))}
        </select>
      </div>
      <div>
        <div>Select</div>
        <select onClick={(e) => e.stopPropagation()}>
          {nfOptions.map((el) => (
            <option>{el}</option>
          ))}
        </select>
        <button>Add</button>
      </div>
    </div>
  );
}
