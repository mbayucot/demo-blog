import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  routes: {
    callback: process.env.AUTH0_REDIRECT_URI,
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  },
  authorizationParams: {
    audience: process.env.AUTH0_AUDIENCE,
  },
});
