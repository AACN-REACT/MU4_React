import React from "react";
import { LoaderOptionsPlugin } from "webpack";
import { EndpointConstructor } from "../mediauploader/utils/endpoint_constructor";

const Identity = React.createContext();
const Authentication = React.createContext();
const Logout = React.createContext();
const Endpoint = React.createContext();
const RefreshList = React.createContext();
const ErrorHandler = React.createContext();

export { Identity, Authentication, Logout, Endpoint, RefreshList, ErrorHandler };

export function GlobalContext({
  errorHandler,
  identity,
  authentication,
  logout,
  endpoint,
  refreshList,
  children,
}) {
  return (
    <ErrorHandler.Provider value={errorHandler}><Identity.Provider value={identity}>
    <Authentication.Provider value={authentication}>
    <Logout.Provider value={logout}>
    <Endpoint.Provider value={endpoint}>
    <RefreshList.Provider value={RefreshList}>
    {children}
    </RefreshList.Provider>
    </Endpoint.Provider>
    </Logout.Provider>
    </Authentication.Provider>
    </Identity.Provider></ErrorHandler.Provider>
  );
}
