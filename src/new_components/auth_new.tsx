import React from "react";
import { useAuth } from "../utils/custom_hooks/useauth";

import { Authentication, Identity } from "./contexts";

export function Auth({ idserver, flow, config, children }) {
  const [identity, isAuthenicated, logout] = useAuth(config);
  console.log("ID", isAuthenicated);
  const AuthorisedChildren = React.Children.map(children, function (el, ind) {
    return React.cloneElement(el);
  });

  return (
    <Identity.Provider value={identity}>
      <Authentication.Provider authenticated={isAuthenicated}>
        {AuthorisedChildren}
      </Authentication.Provider>
    </Identity.Provider>
  );
}
