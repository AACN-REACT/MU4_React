import React from "react";

import {LoaderOne} from './loader_ani_1'
import { CatchNetworkError } from "../utils/catchNetworkError";
export function FinalizeButton({
  setDetailsLoading,
  disabled = false,
  itemKey,
  user,
  identity,
  setErrorMsg,
  refetchData,
}) {
  const [finalized, setFinalized] = React.useState(false);

  function FinalizeVideo(event) {

    setDetailsLoading(true)
    fetch(
      `https://localhost:44340/api/v1/Medias/${itemKey}/stakeholderfinalization?username=${identity.profile.given_name}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${identity.access_token}`,
        },
      }
    )
      .then((res) => CatchNetworkError.call(null, res, setErrorMsg))
      .then((res) => {
        if (res.Result === true) {
          setFinalized(true);
          refetchData((d) => !d);
        }
        if (res.Result === false) {
          setErrorMsg(res.Errors[0]["Value"]);
        }
      })
      .then(res=>{setDetailsLoading(d=>!d); return res})
      .catch((err) => {
        setErrorMsg(err);
      });
  }

  React.useEffect(() => () => setFinalized(false), [itemKey]);
  return (
    <div
      className={
        finalized || disabled
          ? "disabled-delete-button"
          : "active-delete-button"
      }
      onClick={FinalizeVideo}
    >
      Finalize
    </div>
  );
}
