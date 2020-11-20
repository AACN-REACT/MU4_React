import React from "react";
import { getGuid } from "../utils/getguid.ts";

export function FileInput({ handler, stateSetter }) {
  return (
    <form className="input-form">
      <label className="input-label" htmlFor="inputButton">
        OR SELECT A FILE
        <input
          id="input-field"
          type="file"
          multiple
          onChange={(e) => {
            handler(
              e,
              `https://localhost:44308/api/v1/Medias/${getGuid()}?username=aacn%2Famin.khan`,
              false,
              stateSetter
            );
          }}
        />
      </label>
    </form>
  );
}
