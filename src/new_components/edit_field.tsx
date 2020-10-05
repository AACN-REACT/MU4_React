import * as React from "react";
import tick from "../images/check.png";

export function EditableField({
  method = "GET",
  setter,
  endpoint,
  name,
  displayName,
  data,
  user,
  itemKey,
  itemName,
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
      <div className="detail-name">{displayName}</div>
      {!isEditable ? (
        <div onClick={(e) => toggleEditable(true)} className="detail-value">
          {data}
        </div>
      ) : (
        <div className="input-container">
          <input ref={inputValue} type="text" />
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
