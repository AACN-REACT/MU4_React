# Authentication

Media Uploader uses authenticatoion using the OpenIDconnect protocol as served by Identity Server framework on the backened
and its accompanying javascript client library oidc-client on the frontend.

## Requirements:

- use PCKE + code as the flow(request_type=code)
- the authentication flow begins automatically
- user name is derived from the identity_token that is returned
- the API is protected by the access token that is returned
- no requirements as of yet with regards to logging out of refreshing/renewing tokens

# Client

Oidc-client is used to provide the low-level functionality.
This is initiated through the useAuth hook which is invoked on APP
useAuth returns a list of values:

1. userinfo
2. authenticated flag
3. method to logout

initiate a new instance of the UserManager class and pass in the configuration for the identity server

                    mgr = new UserManager(config)

One could also augment the config with a storage property that determines where the token will be stored - local or session storage

                    mgr = new UserManager({...config, userStore: new WebStorageStateStore({ store: localStorage}))

