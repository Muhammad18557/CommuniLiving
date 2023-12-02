"use client";
import axios from "axios";
import { useState } from "react";
import './login.css';





import Auth from "../components/Body/authentication/Auth";

function Login() {

  return (

    <div className="Auth-form-container">
      <br></br>
      <br></br>
      <img
            className="logo-image"
            src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
            alt="Your Company"
          />
      <br></br>
      <br></br>
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name='username'
              type='text'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <br></br>
          <div>
        <p>If you don't have an account yet, <a href="#" id="signUpLink">click here to sign up</a>.</p>
    </div>
        </div>
      </form>

    <div>
      <Auth isSignUp={false} />

    </div>

    </div>
  );
}

export default Login;