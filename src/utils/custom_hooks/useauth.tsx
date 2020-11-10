import * as React from "react";
import { UserManager } from "oidc-client";
import placeholder from "../../images/SVG/question.svg";
export function useAuth(idserver, flow, settings) {
  const [isAuthenticated, authenticate] = React.useState(false);

  const [mgr] = React.useState(new UserManager({ ...settings }));
 
  const [identity, setIdentity] = React.useState({
    profile: { acces_token: "", name: "guest", picture: null },
  });
  const hasCode = new URL(window.location.href)
  localStorage.setItem("code", hasCode.searchParams.get("code"))
  const checkURL =
    flow === "pkce" ? localStorage.getItem("code"): window.location.hash;
  console.log("check url ", checkURL);
  if (settings === false) {
    return [identity, true];
  }
  alert("check "+checkURL)
  React.useEffect(function () {
    //when the component first loads , there will be no hash fragment in the url
    if (checkURL!==new URL(window.location.href).searchParams.get("code")) {
      console.log("no code", checkURL)
      mgr.signinRedirect();
    } else {
      console.log("yes code", checkURL)
      mgr
      .signinRedirectCallback()
        .then((user) => {
          authenticate(true);
          setIdentity((s) => ({ ...s, ...user }));
          flow==="pkce"?window.location.replace(""):window.location.replace("#");

          return user;
        })
        .catch((err) => setIdentity({ error: err }));
    }

    return ()=>{localStorage.removeItem("code")}
  }, []);

  return [identity, isAuthenticated];
}
