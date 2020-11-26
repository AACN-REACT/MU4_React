import React from "react";

export function FinalizeButton({disabled=false, itemKey, user, identity }) {
  const [finalized, setFinalized] = React.useState(false);

  function FinalizeVideo(event) {
    fetch(
      `https://localhost:44340/api/v1/Medias/${itemKey}/stakeholderfinalization?username=${user}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${identity.access_token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("BUTT 1", res);
        if (res.Result === true) {
          alert("true");
          setFinalized(true);
        }
      })
      .catch((err) => console.log("BUTTON ERR", err));
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
