import React from "react";
import { UserManager, Logger, WebStorageStateStore } from "oidc-client";
import placeholder from "../../images/SVG/question.svg";
// export function useAuth(idserver, flow, settings) {
//   const [isAuthenticated, authenticate] = React.useState(false);

//   const [mgr] = React.useState(new UserManager({ ...settings }));

//   const [identity, setIdentity] = React.useState({
//     profile: { acces_token: "", name: "guest", picture: null },
//   });
//   const hasCode = new URL(window.location.href)
//   localStorage.setItem("code", hasCode.searchParams.get("code"))
//   const checkURL =
//     flow === "pkce" ? localStorage.getItem("code"): window.location.hash;
//   console.log("check url ", checkURL);
//   if (settings === false) {
//     return [identity, true];
//   }
//   alert("check "+checkURL)
//   React.useEffect(function () {
//     //when the component first loads , there will be no hash fragment in the url
//     if (checkURL!==new URL(window.location.href).searchParams.get("code")) {
//       console.log("no code", checkURL)
//       mgr.signinRedirect();
//     } else {
//       console.log("yes code", checkURL)
//       mgr
//       .signinRedirectCallback()
//         .then((user) => {
//           authenticate(true);
//           setIdentity((s) => ({ ...s, ...user }));
//           flow==="pkce"?window.location.replace(""):window.location.replace("#");

//           return user;
//         })
//         .catch((err) => setIdentity({ error: err }));
//     }

//     return ()=>{localStorage.removeItem("code")}
//   }, []);

//   return [identity, isAuthenticated];
// }

export function useAuth(config) {
  //set up state to hold authenticated values
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  //set up userManager

  // const [mgr, setMgr] = React.useState(
  //   new UserManager({
  //     ...config,
  //     userStore: new WebStorageStateStore({ store: localStorage }),
  //   })
  // );
  const [mgr, setMgr] = React.useState(function(){return new UserManager(config)});

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
      console.log("re-rendered");
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
    [mgr, redirectedFromCallback]
  );

  return [identity, isAuthenticated, mgr.signoutRedirect.bind(mgr)];
}
