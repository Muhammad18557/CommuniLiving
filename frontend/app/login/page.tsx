"use client"

import Auth from "../components/Body/authentication/Auth";

function Login() {

  return (
    <div>
      <Auth isSignUp={false} />
    </div>
  );
}

export default Login;