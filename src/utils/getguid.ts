// this is to generate a GUID for various uses such as provide form content with a  unique identifier
// NB the GUID utilises Javascript random function which is not ideal, adequate for our purposes
// This sits outside the function to prevent it from being initialised with each function call
export function getGuid() {
  let sec = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  console.log(
    (
      sec() +
      sec() +
      "-" +
      sec() +
      "-4" +
      sec().substr(0, 3) +
      "-" +
      sec() +
      "-" +
      sec() +
      sec() +
      sec()
    ).toLowerCase()
  );
  return (
    sec() +
    sec() +
    "-" +
    sec() +
    "-4" +
    sec().substr(0, 3) +
    "-" +
    sec() +
    "-" +
    sec() +
    sec() +
    sec()
  ).toLowerCase();
}
