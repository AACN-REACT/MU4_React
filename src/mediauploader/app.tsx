import * as React from "react";

//components
import { Container } from "./components/container";
import { Portal } from "./components/portal";
import { ErrorToast } from "./components/errortoast";
import { Title } from "./components/title";
import { Body } from "./components/body";
import { Dropzone } from "./components/dropzone";
import { MediaList } from "./components/medialist";

//utils
import { EndpointConstructor } from "./utils/endpoint_constructor";

// openid settings and hooks
import { pkce, pkcetls, auth0, aacn } from "./data/identity-config";
import { useAuth } from "./custom_hooks/useAuth";

const mediaManagement = new EndpointConstructor({
  origin: "https://localhost:44340",
  version: 1,
  name: "MediaManagement",
});
export function App() {
  //this function takes no props but includes constants within scope
  // extract  with searh params to give error and or mediaKey intial state
  let searchParams = React.useMemo(() => {
    return new URL(window.location.href).searchParams;
  }, [window.location.href]);

  // this code puts any mediakey in the url into localstorage and returns it or null
  const idTakenFromUrl = React.useMemo(
    function () {
      if (searchParams.get("mediakey")?.length > 0) {
        let tempMediaKey = searchParams.get("mediakey");
        localStorage.setItem("mediakey", tempMediaKey);
        return tempMediaKey;
      }
      return null;
    },
    [searchParams]
  );

  // set up  global state

  const [tooltip, setToolTip] = React.useState("");

  const [errorMsg, setErrorMsg] = React.useState(
    searchParams.has("error") ? searchParams.get("error") : null
  );
  const [mediaKey, setMediaKey] = React.useState(localStorage.getItem('mediakey')?localStorage.getItem('mediakey'):idTakenFromUrl);

  // data state

  const [[pendingList, finalizedList], setManagementLists] = React.useState([
    [],
    [],
  ]);

  // Effects..
  // initiate authentication
  const [userInfo, isAuthenticated, logout] = useAuth(pkcetls);

  // initiate fetching and setting list
  React.useEffect(
    function () {
      if (isAuthenticated) {
        mediaManagement
          .fetchMainList(userInfo.access_token)
          .then((res) => {
            if (res.status === 401) {
              throw new Error("401 api denied request, possible stale token");
            }
            return res.json();
          })
          .then((res) => {
            console.log("RES", res);
            let completed = res["Result"]["FinalizedMediaDetailsDtos"];
            let pending = res["Result"]["PendingMediaDetailsDtos"];

            console.log("completed", pending);
            setManagementLists([pending, completed]);
          })
          .catch((err) => {
            console.log("my error", err);
            setErrorMsg(err.message);
          });
      }
    },
    [userInfo, isAuthenticated]
  );

  return (
    <Container>
      <ErrorToast msg={errorMsg} close={setErrorMsg} />
      <Title
        profile={userInfo.profile}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <Body>
        <MediaList list={pendingList} />
        <Dropzone />
        <MediaList list={finalizedList} />
      </Body>
    </Container>
  );
}
