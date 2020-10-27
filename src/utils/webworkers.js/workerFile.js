onmessage = function ({ data }) {
  let ss = data;
  console.log("worker", ss);
  postMessage(ss);
};
