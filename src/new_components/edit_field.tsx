import React from "react";
import tick from "../images/check.png";

export function EditableField({
  isDetailsLoading,
  method = "GET",
  setter,
  endpoint,
  name,
  displayName,
  data,
  user,
  itemKey,
  itemName,
  token,
  refetchData,
}) {
  console.log("DATA", data);
  const [isEditable, toggleEditable] = React.useState(false);
  const inputValue = React.useRef();
  console.log(isEditable);
  function sendData(userEdit) {
    let myquery = new URLSearchParams({ [itemName]: userEdit, username: user });
    let myrequest = new Request(
      endpoint + itemKey + "/" + name.toLowerCase() + "?" + myquery.toString(),
      {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("My request", myrequest);
    fetch(myrequest)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay!!");
          setter((s) => {
            return { ...s, [name]: userEdit };
          });
          refetchData((d) => !d);
          return res;
        } else {
          throw new Error("woops");
        }
      })
      .then((res) => toggleEditable(false))
      .catch((err) => console.log(err));
  }

  return (
    <div className="field-container">
      <div className="detail-name-edit">
        <div>{displayName}</div>
        <div
          onClick={(e) => toggleEditable((s) => !s)}
          className={isEditable ? "edit-icon-active" : "edit-icon"}
        >
          {String.fromCharCode(9998)}
        </div>
      </div>
      {isDetailsLoading ? (
        <h2>loading..</h2>
      ) : !isEditable ? (
        <div className="detail-value">
          {Array.isArray(data) ? data.join(",") : data}
        </div>
      ) : (
        <div className="input-container">
          <input ref={inputValue} type="text" placeholder={data} />
          <div
            onClick={(e) => {
              toggleEditable(false);
              sendData(inputValue.current.value);
            }}
            className="check"
          >
            <img src={tick} />
          </div>
        </div>
      )}
    </div>
  );
}
