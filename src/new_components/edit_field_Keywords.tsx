import * as React from "react";
import tick from "../images/check.png";

export function KeywordEditableField({
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
  function deleteData(userEdit) {
    let myquery = new URLSearchParams({ [itemName]: userEdit, username: user });
    let myrequest = new Request(
      endpoint + itemKey + "/" + name.toLowerCase() + "?" + myquery.toString(),
      {
        method: "DELETE",
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
    <div className="keyword-container">
      <div className="detail-name">
        <div>{displayName}</div>
        <div
          onClick={(e) => toggleEditable((s) => !s)}
          className={isEditable ? "edit-icon-active" : "edit-icon"}
        >
          {String.fromCharCode(9998)}
        </div>
      </div>
      {!isEditable ? (
        <div className="detail-value">
          {Array.isArray(data) ? data.join(",") : data}
        </div>
      ) : (
        <div className="keyword-input-container">
          {data?.map((el) => (
            <div className="keyword-popup">
              <input ref={inputValue} placeholder={el} type="text" />

              <div
                onClick={(e) => {
                  deleteData(el);
                }}
              >
                {String.fromCharCode(10008)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
