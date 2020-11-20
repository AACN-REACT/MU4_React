import React from "react";
import { Endpoint } from "../../new_components/contexts";

export const SetToolTip = React.createContext();
export const SetErrorMsg = React.createContext();
export const Endpoints = React.createContext();

export function GlobalStateContexts({
  setToolTip,
  setErrorMsg,
  endpoints,
  children,
}) {
  return (
    <Endpoint.Provider value={endpoints}>
      <SetToolTip.Provider value={setToolTip}>
        <SetErrorMsg.Provider value={setErrorMsg}>
          {children}
        </SetErrorMsg.Provider>
      </SetToolTip.Provider>
    </Endpoint.Provider>
  );
}
