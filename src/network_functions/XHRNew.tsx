export function XHRNew(item, url, setter, dispatch) {
  function createFormData(file) {
    let myFormData = new FormData();
    myFormData.append("file", file);
    return myFormData;
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.upload.onprogress = function (e) {
    console.log("progress!!", e.loaded * (100 / e.total));
    setter((progress) => e.loaded * (100 / e.total));
  };
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("DONE!");
      dispatch({ type: "CANEDIT", action: item.id });
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log("ERROR", xhr.status);
    }
  });
  let mydata = createFormData(item.file);
  xhr.send(mydata);
  return xhr
}
