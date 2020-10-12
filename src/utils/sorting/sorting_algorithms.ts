/* take an array of media items and sort the date on them */

let collection = [
  { time: "2020-10-08T15:28:25.9709411" },
  { time: "2020-10-08T15:29:58.9980937" },
  { time: "2020-10-10T20:47:14.0897931" },
  { time: "2020-10-08T14:22:18.1766176" },
  { time: "2020-10-11T02:31:32.4581747" },
  { time: "2020-10-09T14:55:06.0426507" },
  { time: "2020-10-11T02:44:55.9666134" },
  { time: "2020-10-08T15:29:56.1546104" },
  { time: "2020-10-10T20:53:07.5826441" },
  { time: "2020-10-10T20:48:37.4130218" },
];

export function sortOldestDate(a, b) {
  return new Date(a) - new Date(b);
}
export function sortNewestDate(a, b) {
  return new Date(b) - new Date(a);
}

export function Paginate(arr, numPerPage) {
  let remainder = arr.length % numPerPage;
  let newArray = [];
  for (let i = 0; i < arr.length; i += numPerPage) {
    let temp = arr.slice(i, i + numPerPage);
    newArray.push(temp);
  }

  return newArray;
}
