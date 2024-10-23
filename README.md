# Introduction to OpenID Connect

OpenID Connect (and Oauth) is the protocol used to log in with third party providers like Google or Microsoft. As an application developer, you integrate with OpenID Connect by redirecting the browser to the Identity Provider and tell the Identity Provider where to redirect the user after logging in. When the browser returns to your application, the Identity Provider sends information in the URL that lets you complete the login.

In this lecture, we will use Google as an identity provider. The information we need to find the API endpoints for Google are provided in their configuration document at https://accounts.google.com/.well-known/openid-configuration

## Register your application with the Google as an Identity Provider

https://console.cloud.google.com/apis/credentials

## Redirect the user to log in:

```jsx
function LoginButton() {
  const client_id = "....";

  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function loadConfiguration() {
    const res = await fetch(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    const openidConfiguration = await res.json();
    const query = {
      response_type: "token",
      client_id,
      scope: "profile",
      redirect_uri: window.location.origin + "/login/google/callback",
    };
    setAuthorizationUrl(
      `${openidConfiguration.authorization_endpoint}?${new URLSearchParams(query)}`,
    );
  }
  useEffect(() => {
    loadConfiguration();
  }, []);
  return authorizationUrl ? <a href={authorizationUrl}>Logg inn</a> : null;
}
```

### Handle the callback from the Identity Provider

```jsx
function LoginCallback() {
  const navigate = useNavigate();
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)).entries(),
  );

  async function loginUser(accessToken) {
    const res = await fetch("/api/login", {
      method: "POST",
      body: new URLSearchParams({ accessToken }),
    });
    if (res.ok) {
      navigate("/");
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    loginUser(callbackParameters.access_token);
  }, [callbackParameters.access_token]);
  return (
    <>
      <div>Please wait...</div>
      <h2>Debugging</h2>
      <pre>{callbackParameters.access_token}</pre>
    </>
  );
}
```

### Set the access token as a cookie with Express

```javascript
app.post("/api/login", (req, res) => {
  const { accessToken } = req.body;
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.sendStatus(200);
});
```

### Look up the user information from the cookie

```javascript
app.get("/api/userinfo", async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const { userinfo_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const userinfo = await fetchJson(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  res.json(userinfo);
});
```
