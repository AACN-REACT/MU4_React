export function XHRNew(file, url, setter) {
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
    }
    else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log("ERROR", xhr.status);
    }
  });
  let mydata = createFormData(file);
  xhr.send(mydata);


}
