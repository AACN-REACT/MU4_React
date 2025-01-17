import React from "react";
import {KeywordSelector} from './keyword_selector'

export function KeywordEditableField({
  isDetailsLoading,
  close,
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
  console.log("DATA keyword", data);
  const [displayKeywords, addDisplayKeywords] = React.useState(data);
  console.log("display keywords", displayKeywords);
  const [isEditable, toggleEditable] = React.useState(false);
  const inputValue = React.useRef();

  //useEffect to set display keywords

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
          setter((s) => {
            return { ...s, [name]: userEdit };
          });

          return res;
        } else {
          throw new Error("woops");
        }
      })
      .then((res) => addDisplayKeywords((d) => [d, userEdit]))
      .then((res) => {
        refetchData((d) => !d);
      }) //!!!! no longer spreading the d value, presume is it string not an array
      .catch((err) => console.log(err)); // ad
  }
  function deleteData(userEdit) {
    let myquery = new URLSearchParams({ [itemName]: userEdit, username: user });
    let myrequest = new Request(
      endpoint + itemKey + "/" + name.toLowerCase() + "?" + myquery.toString(),
      {
        method: "DELETE",
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
          return res;
        } else {
          throw new Error("woops");
        }
      })
      .then((res) =>
        addDisplayKeywords((d) => d?.splice(d.indexOf(userEdit), 1))
      )
      .then((res) => {
        refetchData((d) => !d);
      })
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
        <KeywordSelector  data={data} deleteData={deleteData} sendData={sendData} close={toggleEditable} />)
      //   <div className="netforum-selector">
      //     <div className="keyword-input-container">
      //       {Array.isArray(data)
      //         ? data.map((el, indx, data) => {
      //             return (
      //               <div className="keyword-popup">
      //                 <div className="keyword-name">{el}</div>

      //                 <div
      //                   className="keyword-icon"
      //                   onClick={(e) => {
      //                     deleteData(el);
      //                   }}
      //                 >
      //                   {String.fromCharCode(10008)}
      //                 </div>
      //               </div>
      //             );
      //           })
      //         : () => null}
      //       <input ref={inputValue} type="text" placeholder="enter keyword" />
      //       <div
      //         onClick={(e) => {
      //           sendData(inputValue.current.value);
      //         }}
      //         className="check"
      //       >
      //         <img src={tick} />
      //       </div>
      //     </div>
      //   </div>
      //   //end
      // )
    }
    </div>
  );
}
