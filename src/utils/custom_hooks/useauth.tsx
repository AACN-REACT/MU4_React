import * as React from "react";
import { UserManager } from "oidc-client";
import placeholder from "../../images/SVG/question.svg";
export function useAuth(idserver, flow, settings) {
  const [isAuthenticated, authenticate] = React.useState(false);

  const [mgr] = React.useState(new UserManager({ ...settings }));
  console.log("mgr", mgr);
  const [identity, setIdentity] = React.useState({
    profile: { acces_token: "", name: "guest", picture: null },
  });
  const checkURL =
    flow === "pkce" ? window.location.search : window.location.hash;
  alert("cehck url" + checkURL);
  if (settings === false) {
    return [identity, true];
  }
  React.useEffect(function () {
    //when the component first loads , there will be no hash fragment in the url
    if (checkURL.length < 1) {
      mgr.signinRedirect();
    } else {
      mgr
        .signinRedirectCallback()
        .then((user) => {
          authenticate(true);
          setIdentity((s) => ({ ...s, ...user }));
          alert(localStorage.getItem("mediakey"));
          window.location.replace("#");

          return user;
        })
        .catch((err) => setIdentity({ error: err }));
    }

    // return ()=>{sessionStorage.clear();localStorage.clear()}
  }, []);

  return [identity, isAuthenticated];
}
