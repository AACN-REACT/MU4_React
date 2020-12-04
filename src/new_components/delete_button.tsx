import React from "react";

export function DeleteButton({
  disabled = false,
  itemKey,
  user,
  identity,
  setErrorMsg,
  refetchData
}) {
  const [deleted, setDeleted] = React.useState(false);

  function DeleteVideo(event) {
    fetch(`https://localhost:44340/api/v1/Medias/${itemKey}?username=${identity.profile.given_name}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${identity.access_token}`,
      },
    })
    .then((res) => {
        if (res.status > 399 && res.status < 600) {
          alert(res.error);
          setErrorMsg(`Could not be deleted.\n Bad request: response status ${res.status} \n `);
        }
        return res.json();
      })
      .then((res) => {
        if (res.Result === true) {
          setDeleted(true);
          refetchData(d=>!d)
        }
        if (res.Result === false){
          setErrorMsg(res.Error[0]['error'])
        }
      })
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
