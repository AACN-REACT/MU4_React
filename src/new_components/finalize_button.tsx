import React from "react";

export function FinalizeButton({disabled=false, itemKey, user, identity, setErrorMsg,refetchData }) {
  const [finalized, setFinalized] = React.useState(false);

  function FinalizeVideo(event) {
    fetch(
      `https://localhost:44340/api/v1/Medias/${itemKey}/stakeholderfinalization?username=${identity.profile.given_name}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${identity.access_token}`,
        },
      }
    )
.then((res) => {
        if (res.status > 399 && res.status < 600) {
          alert(res.error);
          setErrorMsg(`Could not be deleted.\n Bad request: response status ${res.status} \n `);
        }
        return res.json();
      })
      .then((res) => {
        if (res.Result === true) {
          setFinalized(true);
          refetchData(d=>!d)
        }
        if (res.Result === false){
          setErrorMsg(res.Errors[0]['Value'])
        }
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  }

  React.useEffect(() => () => setFinalized(false), [itemKey]);
  return (
    <div
      className={finalized || disabled ? "disabled-delete-button" : "active-delete-button"}
      onClick={FinalizeVideo}
    >
      Finalize
    </div>
  );
}
