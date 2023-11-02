"use client"

import Auth from "../components/Body/authentication/Auth";

function SignUp() {

  return (
    <div className="main-container">
      <Auth isSignUp={true} />
    </div>
  );
}

export default SignUp;
