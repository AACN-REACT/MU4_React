export let auth0 = {
  name: "testclient",
  authority: "https://aacnreact.auth0.com",
  client_id: "pm1LuFSRP6KeTlXZtlvp7xWePO2aRtcM",
  redirect_uri: "http://localhost:8080",
  response_type: "id_token token",
  scope: "openid profile",
};

export let aacn = {
  name: "reactclient",
  authority: "https://localhost:44388/",
  client_id: "reactclient",
};
