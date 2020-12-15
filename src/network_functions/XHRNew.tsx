export function XHRNew(item, url, setter, dispatch, token, setErrorMsg) {
  function createFormData(file) {
    let myFormData = new FormData();
    myFormData.append("file", file);
    return myFormData;
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.responseType = "json";
  xhr.upload.onprogress = function (e) {
    console.log("progress!!", e.loaded * (100 / e.total));
    setter((progress) => e.loaded * (100 / e.total));
  };
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.response["Result"] === false) {
        console.log("...", setErrorMsg);
        setErrorMsg(
          xhr.response["Errors"].length > 0
            ? xhr.response["Errors"][0]["Value"]
            : xhr.response["ErrorInfo"].UserErrorMessage
            ? xhr.response["ErrorInfo"].UserErrorMessage
            : "Error occured"
        );
      } else {
        dispatch({ type: "CANEDIT", action: item.id });
      }
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log("ERROR", xhr.status);
      setErrorMsg(`Error uploading file: ${xhr.status}`);
    }
  });
  let mydata = createFormData(item.file);
  xhr.send(mydata);
  return xhr;
}
