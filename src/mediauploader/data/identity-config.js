export const auth0 = {
  name: "testclient",
  authority: "https://aacnreact.auth0.com",
  client_id: "pm1LuFSRP6KeTlXZtlvp7xWePO2aRtcM",
  redirect_uri: "http://localhost:8080",
  response_type: "id_token token",
  scope: "openid profile",
};

export const aacn = {
  name: "reactclient",
  authority: "https://localhost:44333/",
  client_id: "reactclient",
  redirect_uri: "http://localhost:8080",
  response_type: "id_token",
  scope: "openid profile",
};
export const pkce = {
  name: "reactclientpkce",
  authority: "https://localhost:44333/",
  client_id: "reactclientpkce",
  redirect_uri: "http://localhost:8080",
  response_type: "code",
  scope: "openid profile mediauploaderapi",
};
export const pkcetls = {
  name: "reactclientpkce",
  authority: "https://localhost:44333/",
  client_id: "reactclientpkce",
  redirect_uri: "https://localhost:8080",
  response_type: "code",
  scope: "openid profile mediauploaderapi",
  silent_redirect_uri: "https://localhost:8080",
  post_logout_redirect_uri: "https://localhost:8080",
};
