import * as React from "react";
import { UserManager } from "oidc-client";
import placeholder from '../../images/SVG/question.svg'
export function useAuth(settings) {
  const [isAuthenticated, authenticate] = React.useState(false);

  const [mgr] = React.useState(new UserManager(settings));
  const [identity, setIdentity] = React.useState({profile:{acces_token:"",name:"guest", picture:null }});
  const hash = window.location.hash;

  if(settings===false){
    return [identity, true]
  }
  React.useEffect(function () {
    //when the component first loads , there will be no hash fragment in the url
    if (hash.length < 1) {
      mgr.signinRedirect();
    } else {
      mgr
        .signinRedirectCallback()
        .then((user) => {
          authenticate(true);
          setIdentity(s=>({...s,...user}));
          window.location.replace("#");
          return user;
        })
        .catch((err) => setIdentity({ error: err }));
    }

    // return ()=>{sessionStorage.clear();localStorage.clear()}
  }, []);

  return [identity, isAuthenticated];
}
