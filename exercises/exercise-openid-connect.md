# Exercise: OpenID Connect

> The purpose of this exercise is to make you familiar with the OpenID protocol for login services.
> The exercise takes you through creating a "Login with Google"-function and then
> "Login with your school account"

> **Note**: There are libraries which attempt to simplify integration. However, I have always found these
> to be harder to understand than the protocol. Everything you need to know to use the protocol, you
> also need to know to use the libraries.

In order to create login-functionality with an Identity Provider (like Google, LinkedIn or Entra ID),
you need to go through the following steps:

1. Register your application with the identity provider. You have to register your application's url and get a
   `client_id` from the provider
2. Create an authorization redirect. The authorization redirect sends the user to the identity provider with a
   return url and the client_id (from step 1)
3. Handle the callback from the Identity Provider to your application. For some Identity Providers, this callback
   will contain a token that proves the user's identity, for others, it contains an authentication code you can use
   to get this token
4. For some Identity Providers: use the authorization code from the callback to obtain the token
5. Use the access token from the Identity Provider to get information about the user

## Exercise 10: OpenID Connect with Google

1. Set up the application in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Create a new
   OAuth client ID and select Web Application. Make sure `http://localhost:5173` is added as an Authorized JavaScript
   origin and `http://localhost:5173/login/callback` is an authorized redirect URI
2. Create a [React Application](../README.md#creating-the-frontend-project) and an
   [Express Backend](../README.md#implement-server-side-apis-with-express)
3. To start authentication, redirect the browser ([see code below](#generating-the-authentication-redirect))
4. To complete the authentication, post `access_token` when Google redirects the browser back to the
   backend ([see code below](#handle-the-callback))
5. In the backend, save the `access_token` as a cookie
6. Use the cookie to fetch user information when the client makes a request to the backend

### Generating the authentication redirect

```javascript
function GoogleLoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function generateAuthorizationUrl() {
    // Get the location of endpoints from Google
    // Implementing `fetchJSON` is left as an exercise to the reader
    const {authorization_endpoint} = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    // Tell Google how to perform the authentication
    const parameters = {
      response_type: "token",
      client_id:
         "<get this from Google Cloud Console>",
      // Tell user to come back to http://localhost:5173/login/callback when logged in
      redirect_uri: window.location.origin + "/login/callback",
      scope: "profile email",
    };
    setAuthorizationUrl(
      discoveryDoc.authorization_endpoint +
      "?" +
      new URLSearchParams(parameters),
    );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

  return <a href={authorizationUrl}>Log in with Google</a>;
}
```

### Handle the callback

In order to call the correct code when Google completes the login and redirects the user back to you
application, you should set up [React Router](../README.md#react-router) with a
`<Route path="/login/callback" element={<LoginCallback />} />`.

The `<LoginCallback />` component should extract the `access_token` and post it to the backend:

```javascript
import {useNavigate} from "react-router";

export function LoginCallback() {
  const navigate = useNavigate();
  // Given an URL like http://localhost:5173/login/callback#access_token=sdlgnsoln&foo=bar,
  //  window.location.hash will give the part starting with "#"
  //  ...substring(1) will remove the "#"
  //  and Object.fromEntries(new URLSearchParams(...)) will parse it into an object
  // In this case, hash = { access_token: "sdlgnsoln", foo: "bar" }
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    const {access_token} = callbackParameters;
    await fetch("/api/login/googleAccessToken", {
      method: "POST",
      body: JSON.stringify({access_token}),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait...</div>;
}
```

### Save the access token in a cookie

You must set up the [Express Backend](../README.md#implement-server-side-apis-with-express). Make sure that
`client/vite.config.js` is set up to proxy `/api` to `http://localhost:3000`.

You must set up Express to accept `POST /api/login/googleAccessToken`:

```js
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
express.use(cookieParser());
express.use(express.json());
express.use(express.static("../client/dist"));
express.post("/api/login/googleAccessToken", (req, res) => {
  const {access_token} = req.body;
  res.cookie("googleAccessToken", access_token).sendStatus(201);
})
app.listen(3000);
```

### Retrieve userinfo in Express

We also update Express to accept `GET /api/login` to retrieve user login information:

```javascript
app.get("/api/login", async (req, res) => {
  const {googleAccessToken} = req.cookies;
  if (googleAccessToken) {
    // Implementing `fetchJSON` is left as an exercise to the reader
    const {userinfo_endpoint} = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {"Authorization": `Bearer ${access_token}`},
    });
    res.json(userinfo);
  } else {
    res.send(401);
  }
});
```

### Stitching together the parts

Hopefully, you will be able to make all the parts work together:

In your React `<Application />` component, you should call `GET /api/login`. If the call returns 200,
display the user information returned from Google, otherwise show the `<GoogleLoginButton />`

## Exercise 12: OpenID Connect with Microsoft Entra ID (optional)

Entra ID can be used to authenticate with the Active Direct account on an organization, such as the school.

Entra ID doesn't support the `response_type: "token"`, which we used with Google. Instead, we must
use `response_type: "code"`. With this, instead of returning a hash with `access_token`, we will be
redirect back with a parameter `code`, which we must use for a new `POST` call to get the access token.

Often, `response_type: "code"` is used with the backend performing the token request. This protects the
user from having the code "sniffed". Since we're doing this part in the code, Entra ID requires another
mechanism to protect the user instead, namely Proof of Key Code Exchange (PKCE). This requires us to
pass an additional `code_challenge` parameter to the authentication request.

1. Set up the application in the [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/isMSAApp~/false):
   1. Log in with your school account in the [Azure Portal](https://portal.azure.com)
   2. In the panel search menu, search for [Azure Active Directory B2C](https://portal.azure.com/#create/Microsoft.AzureADB2C)
   3. If you haven't done so, you need to complete "Start with an Azure free trial"
   4. When you have completed creating a new tenant (under Azure Active Directory B2C), you can switch to this tenant by clicking the Gears (⚙️) icon in the menu
   5. Under the left-menu, select Microsoft Entra ID > Manage > App registration
   6. Here you can find Entra ID's discovery endpoint and your client_id, setup the redirect_uri values and create a client_secret 
2. To start authentication, redirect the browser ([see code below](#generating-the-entra-authentication-redirect))
3. To complete the authentication, use the `code` parameter when Entra redirects the browser back to the to
   fetch the access token and post the access token to the backend ([see code below](#handle-the-entra-callback))
4. In the backend, save the `access_token` as a cookie
5. Use the cookie to fetch user information when the client makes a request to the backend


### Put the Entra ID configuration in a separate object

```js
const entraConfig = {
  discoveryEndpoint: "..", // The value from
  client_id: "..", // The value from
}
```

### Generating the Entra authentication redirect

This is similar but different from Google

```javascript
function EntraLoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();

  async function generateAuthorizationUrl() {
    // Get the location of endpoints from EntraID
    const {authorization_endpoint} = await fetchJson(
      entraConfig.discoveryEndpoint
    );

     const code_verifier = randomString();
     sessionStorage.setItem("code_verifier", code_verifier);
     const code_challenge = encodeBytesAsBase64Url(
       await sha256hash(code_verifier),
     );
     const parameters = {
       response_type: "code",
       client_id: entraConfig.client_id,
       redirect_uri: window.location.origin + "/login/entra/callback",
       scope: "profile email openid",
       code_challenge,
       code_challenge_method: "S256"
     };
     setAuthorizationUrl(
         discoveryDoc.authorization_endpoint +
             "?" +
             new URLSearchParams(parameters),
     );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

  return <a href={authorizationUrl}>Log in with your school account</a>;
}
```

See the [course notes](../README.md#redirect-the-client-to-authenticate) for the
implementation of `randomString`, `encodeBytesAsBase64Url` and `sha256hash`.

### Handle the Entra callback

In order to call the correct code when Entra ID completes the login and redirects the user back to you
application, you should set up [React Router](../README.md#react-router) with a
`<Route path="/login/entra/callback" element={<EntraLoginCallback />} />`.

The `<EntraLoginCallback />` is similar to Google, but requires a few more steps to handle the token request

```javascript
import {useNavigate} from "react-router";

export function EntraLoginCallback() {
  const navigate = useNavigate();
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  async function handleCallback() {
    const {code} = callbackParameters;
    const {token_endpoint} = await fetchJson(
      entraConfig.discoveryEndpoint
    );
    const payload = {
      grant_type: "authorization_code",
      code,
      client_id: entraConfig.client_id,
      code_verifier: sessionStorage.getItem("code_verifier"),
    };
    const res = await fetch(tokenEndpoint, {
      method: "POST",
      body: new URLSearchParams(payload),
    });
    // Here a lot can go wrong - it's best to check res.ok and log the request
    const {access_token} = await res.json();

    await fetch("/api/login/entraAccessToken", {
      method: "POST",
      body: JSON.stringify({access_token}),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait...</div>;
}
```

### Save the Entra ID access_token in a Cookie

Saving the access_token from Entra ID very similar to the code with Google and you can extend that code as needed.

### Discussion: `id_token` vs `access_token`

If you inspected the response from the token request to Entra, you may have noticed that in addition to the
`access_token`, Entra ID returned a `id_token`. This is a token on a format called Json Web Token (JWT), which is
a signed payload that tells you who the user is. You can look at how this token is interpreted by pasting it on
https://jwt.io.

An `id_token` is a self-contained, transparent identifying token that the application can verify and extract values from.
The `access_token`, on the other hand is an opaque token that can be used to authorize API calls on behalf of the user.
An example of such an API call is the `userinfo`-call we performed to identify the user.

If you pasted the JWT into http://jwt.io, you may have noticed that it contains more information than is returned from
the Entra ID `userinfo` endpoint. So, which one should we use?

* If we accept an `id_token` from the browser, we need to make sure to verify the cryptographic signature. This
  is a little tricky, but not impossible. A clever user could change the token to contain another users credentials.
  If they do this, and we forget to check the signature, the attacker can impersonate another user
* Alternatively, we could send the `code` to the backend and perform the token request from Express. Since we
  got the `id_token` directly from Entra ID, we don't need to verify the signature. But if we do this, we need
  to store the user information in a Cookie and make sure that we don't accept cookies that has been tampered with.
  (This can be done with [signed cookies](https://expressjs.com/en/resources/middleware/cookie-parser.html))
* The `access_token` doesn't need to be signed when we store it in a cookie, since we're authorizing it with 
  Entra ID. If the user tries to tamper with the `access_token` cookie, the `userinfo` call will fail with a 401-error
* The `id_token` contains an expiration time that we also should respect. However, if the user signs out from 
  Entra ID in the browser, we aren't automatically notified of this and the `id_token` will still be valid.
  On the other hand, the `userinfo` call will not return 401 if we try to use the `access_token` after the user
  is logged out. It is possible to implement "single logout" with OpenID Connect as well, but this requires more work
  on our part.

In conclusion, it is much less work to create a secure application using the `access_token` than the `id_token`,
but the `id_token` contains information such as email address which we might need. (If all we need is a unique id
for the user, the `sub` value of the `userinfo` provides this)

## Deploying to Heroku

When you have developed the login-functionality, you should try to deploy the application to Heroku.

1. Create a new Heroku application and get a hostname from Heroku
2. In the configuration for [Google](https://console.cloud.google.com/apis/credentials) or
   [Entra ID](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview), you should add the callback with Heroku's hostname. E.g. if your hostname
   on Heroku is `myapp-abc-123.herokuapp.com`, you should register `https://myapp-abc-123.herokuapp.com/login/callback`
3. Follow the steps in the [course reference](../README.md#deploy-to-heroku) to set `postinstall`, `build` and `start`
   scripts to work with Heroku
4. On the [Heroku dashboard](https://dashboard.heroku.com/apps/), select the app, select Settings and add the client_id and client_secret under Config Vars
