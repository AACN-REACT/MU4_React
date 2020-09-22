import * as React from "react";

export function FileList({ files }) {
 if (files.length>0){ return (
    <ul className="filelist">
        <h3>Uploading..</h3>
      {files.map((file) => (
        <li key={file}>{file}</li>
      ))}
    </ul>
  )
      }
 return null
}
