import * as React from "react";

// openid settings and hooks
import { pkce, pkcetls, auth0, aacn } from "./data/identity-config";
import { useAuth } from "./custom_hooks/useAuth";

export function App() {
  //this function takes no props but includes constants within scope

  //first we set up some app wide state..

  const [userInfo, isAuthenticated, logout] = useAuth(pkcetls);

  console.log("user info", userInfo);
  return isAuthenticated ? (
    <div>
      <h1>Authenitcated</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <h1>Not authenticated</h1>
  );
}
