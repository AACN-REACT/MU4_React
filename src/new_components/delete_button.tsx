import React from "react";

export function DeleteButton({ itemKey, user, identity }) {
  const [deleted, setDeleted] = React.useState(false);

  function DeleteVideo(event) {
    fetch(`https://localhost:44340/api/v1/Medias/${itemKey}?username=${user}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${identity.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("BUTT 1", res);
        if (res.Result === true) {
          alert("true");
          setDeleted(true);
        }
      })
      .catch((err) => console.log("BUTTON ERR", err));
  }

  React.useEffect(() => () => setDeleted(false), [itemKey]);
  return (
    <div
      className={deleted ? "disabled-delete-button" : "active-delete-button"}
      onClick={DeleteVideo}
    >
      Delete
    </div>
  );
}
