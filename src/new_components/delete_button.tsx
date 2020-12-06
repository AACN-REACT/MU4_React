import React from "react";
import { CatchNetworkError } from "../utils/catchNetworkError";


function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return JSON.parse(result).error;
}
export function DeleteButton({
  setDetailsLoading,
  disabled = false,
  itemKey,
  user,
  identity,
  setErrorMsg,
  refetchData
}) {
  const [deleted, setDeleted] = React.useState(false);


  //then(res=>res.body.getReader().read()).then(({done, value})=>{console.log(">>>",bin2String(value)) })
  function DeleteVideo(event) {
    setDetailsLoading(d=>!d)
    fetch(`https://localhost:44340/api/v1/Medias/${itemKey}?username=${identity.profile.given_name}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${identity.access_token}`,
      },
    })
    .then((res) =>{ return CatchNetworkError.call(null, res, setErrorMsg)})
      .then((res) => {
        if (res.Result === true) {
          setDeleted(true);
          refetchData(d=>!d)
        }
        if (res.Result === false){
          setErrorMsg(res.Error[0]['error'])
        }
      })
      .then(res=>{setDetailsLoading(d=>!d); return res})
      .catch((err) => {
        setErrorMsg(err);
      });
  }

  React.useEffect(() => () => setDeleted(false), [itemKey]);
  return (
    <div
      className={
        deleted || disabled ? "disabled-delete-button" : "active-delete-button"
      }
      onClick={DeleteVideo}
    >
      Delete
    </div>
  );
}
