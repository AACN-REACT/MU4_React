import * as React from "react";
import { UserManager, WebStorageStateStore } from "oidc-client";

// interface IdentityInfo {
//     profile?:any;
// access_token:string;

// }

export function useAuth(config) {
  //set up state to hold authenticated values
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  //set up userManager

  const [mgr, setMgr] = React.useState(
    new UserManager(config))

  //set up state for identity info

  const [identity, setIdentity] = React.useState({
    access_token: "",
  });

  // mgr.events.addAccessTokenExpiring(
  //   function(){
  //     console.log("expirng");
  //     mgr.signinSilent().then(user=>{console.log("re-signed!!")}).catch(err=>console.log("didnt resign :("));changeTokenWillExpire(true)
  //   })

  let myURL = React.useMemo(() => new URL(window.location.href), [
    window.location.href,
  ]);
  const redirectedFromCallback =
    config.response_type === "code"
      ? myURL.searchParams.has("code")
      : myURL.hash !== "";

  const pageHadErrored = myURL.searchParams.has("error");
  React.useEffect(
    function () {
      if (!pageHadErrored) {
        mgr.getUser().then((user) => {
          if (!user && !redirectedFromCallback) {
            mgr
              .signinRedirect()
              .catch(
                (err) =>
                  (window.location.href =
                    window.location.origin + `/?error=${err}`)
              );
          } else if (!user && redirectedFromCallback) {
            mgr
              .signinRedirectCallback()
              .then((user) => {
                let newUrl = window.location.origin;
                window.location.href = newUrl;
              })
              .catch((err) => {
                window.location.href =
                  window.location.origin + `/?error=${err}`;
              });
          }

          // else if (user && tokenWillExpire) {
          //   //check if silent sign-in necessary
          // console.log( "EXPIRES IN ", user.expires_in)
          if (user.expires_in < 100)
            mgr.signinSilent().then((user) => {
              console.log("re-signed!!");
              setIdentity(user);
            });
          // }
          else {
            setIdentity(user);
            localStorage.setItem("mytoken", user.access_token); //should be removed eventually
            setAuthenticated(true);
          }
        });
      }
    },
    []
  );

  return [identity, isAuthenticated, mgr.signoutRedirect.bind(mgr)];
}
