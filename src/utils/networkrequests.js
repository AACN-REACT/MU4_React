// fetch request
import { isAcceptableType } from "./fileprocess";
function useXHRNew(file, url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.upload.onprogress = function (e) {
    console.log("progress!!", e.loaded * (100 / e.total));
  };

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("DONE!");
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log("ERROR", xhr.status);
    }
  });
  let mydata = createFormData(file);
  xhr.send(mydata);
}

export function handleFiles(files, url, shouldFetch) {
  let myfiles = [...files];
  myfiles.forEach((element) => {
    if (shouldFetch) {
      try { useFetch(element, url); }
      catch(err){

        console.log(err)
      }
      console.log("IS THIS A VIDEO?", isAcceptableType(element.type));
    } else {
      useXHR(element);
      console.log("IS THIS A VIDEO?", isAcceptableType(element.type));
    }
  });
}
export function createFormData(file) {
  let myFormData = new FormData();
  myFormData.append("file", file);
  return myFormData;
}

function consume(stream, total = 0) {
  alert("streeeming");
  while (stream.state === "readable") {
    var data = stream.read();
    total += data.byteLength;
    console.log(
      "received " + data.byteLength + " bytes (" + total + " bytes in total)."
    );
  }
  if (stream.state === "waiting") {
    stream.ready.then(() => consume(stream, total));
  }
  return stream.closed;
}
export function useFetch(file, url) {
  alert(fetch);
  fetch(url, {
    method: "POST",
    body: createFormData(file),
  })
    .then((el) => alert("done!"))
    .catch((err) => console.log("ERROR", err));
}

export function useXHR(file, url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.upload.onprogress = function (e) {
    console.log("progress!!", e.progress);
  };

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("DONE!");
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.log("ERROR", xhr.status);
    }
  });
  let mydata = createFormData(file);
  xhr.send(mydata);
}
