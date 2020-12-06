import { SetErrorMsg } from "../mediauploader/components/globalstateContext";
import { bin2String } from "./binaryToString";

export function CatchNetworkError(res, callback) {
  console.log("[[[[", res, "]]]]", callback);

  let responseClone = res.clone();
  if (res.status > 399 && res.status < 600) {
    res.body
      ?.getReader()
      .read()
      .then(({ done, value }) => {
        callback(bin2String(value));
      });
  }
  //return Promise.resolve(res);
  return responseClone.json();
}
