import React from "react";
import { LoaderOptionsPlugin } from "webpack";
import { EndpointConstructor } from "../mediauploader/utils/endpoint_constructor";

const Identity = React.createContext();
const Authentication = React.createContext();
const Logout = React.createContext();
const Endpoint = React.createContext();
const RefreshList = React.createContext();
const ErrorHandler = React.createContext();
const TooltipSetter = React.createContext();

export {
  Identity,
  Authentication,
  Logout,
  Endpoint,
  RefreshList,
  ErrorHandler,
  TooltipSetter
};

export function GlobalContext({
  errorHandler,
  identity,
  authentication,
  logout,
  endpoint,
  refreshList,
  children,
  setToolTip
}) {
  return (
    <ErrorHandler.Provider value={errorHandler}>
      <Identity.Provider value={identity}>
        <Authentication.Provider value={authentication}>
          <Logout.Provider value={logout}>
            <Endpoint.Provider value={endpoint}>
              <RefreshList.Provider value={RefreshList}>
                <TooltipSetter.Provider value={setToolTip}>
                  {children}
                </TooltipSetter.Provider>
              </RefreshList.Provider>
            </Endpoint.Provider>
          </Logout.Provider>
        </Authentication.Provider>
      </Identity.Provider>
    </ErrorHandler.Provider>
  );
}
