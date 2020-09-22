import { handleFiles } from "./networkrequests";

export function dragenter(e) {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.effect = "copy";
  e.target.style.backgroundColor = "red";
}
export function dragover(e) {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
}
export function dragleave(e) {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
  e.target.style.backgroundColor = "lightgray";
  console.log(">>>ITEMS", e.dataTransfer.items);
  console.log(">>>LIST", e.dataTransfer.items);
}
export function drop(e, url, method = false, stateSetter = (file) => null) {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = "lightgray";
  alert("dropped!!");
  let dt = e.dataTransfer;
  let files = dt.files;
  stateSetter((files) =>{ let mylist = Array.from(dt.items).map(item=>[item.getAsFile().name, item.getAsFile().kind]) ;return [...files, ...mylist]});
  handleFiles(files, url, method);
}
export function pick(e, url, method = false, stateSetter = (file) => null) {
    e.persist();
    e.preventDefault();
  alert(e.target);
  let files = e.target.files;
  stateSetter((oldfiles) =>{ let mylist = Array.from(e.target.files).map(item=>[item.name, item.type]) ;return [...oldfiles, ...mylist]});
  handleFiles(e.target.files, url, method);
}


