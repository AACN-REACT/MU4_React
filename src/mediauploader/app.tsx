import * as React from "react";

//components

import { Container } from "./components/container";

// openid settings and hooks
import { pkce, pkcetls, auth0, aacn } from "./data/identity-config";
import { useAuth } from "./custom_hooks/useAuth";

export function App() {
  //this function takes no props but includes constants within scope
  alert("window :" + window.location.href);
  // extract  with searh params to give error and or mediaKey intial state
  let searchParams = React.useMemo(() => {
    return new URL(window.location.href).searchParams;
  }, [window.location.href]);

  const [errorMsg, setErrorMsg] = React.useState(
    searchParams.has("error") ? searchParams.get("error") : undefined
  );
  const [mediaKey, setMediaKey] = React.useState(
    searchParams.has("mediakey") ? searchParams.get("mediakey") : null
  );

  // initiate authentication
  const [userInfo, isAuthenticated, logout] = useAuth(pkcetls);

  console.log("do i read the error? ", !!errorMsg);
  return isAuthenticated ? (
    <Container>
      {errorMsg ? (
        <h1 onClick={(e) => setErrorMsg(undefined)}>{errorMsg}</h1>
      ) : null}
      <h1>Authenitcated</h1>
      <button onClick={logout}>Logout</button>
    </Container>
  ) : (
    <Container>
      {errorMsg ? (
        <h1 onClick={(e) => setErrorMsg(undefined)}>{errorMsg}</h1>
      ) : null}
      <h1>Not authenticated</h1>
    </Container>
  );
}
