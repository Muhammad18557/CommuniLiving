"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cookies from 'js-cookie';


interface AuthFormProps {
  isSignUp: boolean;
}

export default function AuthForm({ isSignUp }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [successSignIn, setSuccessSignIn] = useState(false);

  const router = useRouter();

  const handleNavigation = () => {
    router.push(isSignUp ? '/login' : '/signup');
  };

  // const handleAnonymousLogin = async () => {
  //   // Implement anonymous login logic with your Django backend.
  //   try {
  //     const response = await fetch('/api/anonymous-login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       router.push('/home');
  //     } else {
  //       const data = await response.json();
  //       alert(data.error || 'Trouble signing in anonymously. Please try again.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert('An error occurred.');
  //   }
  // };

  const getCSRFToken = () => {
    return Cookies.get('csrftoken');
  };

  // Example usage
  const csrfToken = getCSRFToken();

  const handleAuthAction = async () => {
    try {
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // const formData = {
      //   username: email,
      //   password,
      //   name: isSignUp ? name : undefined,
      // };

      let formData = {};

      if (isSignUp) {
        // For signup, include name, email, and password
        formData = {
          username: name,
          email,
          password,
          confirmpassword,
        };
      } else {
        // For login, use email as username
        formData = {
          username: email,
          password,
        };
      }
      const apiUrl = isSignUp
      ? 'http://localhost:8000/api/register/' // Replace with your signup API endpoint
      : 'http://localhost:8000/api/login/'; // Replace with your login API endpoint


      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // localStorage.setItem('access_token', data.access);
        // localStorage.setItem('refresh_token', data.refresh);

        if (isSignUp) {
          setSuccessSignUp(true);
        } else {
          setSuccessSignIn(true);
        }

        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        const data = await response.json();
        alert(data.non_field_errors || 'An error occurred.');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred.');
    }
    };

    useEffect(() => {
      if (successSignUp) {
        setTimeout(() => {
          // Redirect to the sign-in page after successful registration
          router.push('/login');
        }, 1500);
      }
    }, [successSignUp]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {!isSignUp && (
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
          )}
          <img
            className="mx-auto h-10 w-auto"
            src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
            alt="Your Company"
          />
          {successSignUp && (
            <div>
              <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faSpinner} spin /> Account created successfully.
              </p>
              <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faCheckCircle} spin /> Redirecting to sign-in page...
              </p>
            </div>
          )}
          {successSignIn && (
            <div>
              <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faCheckCircle} spin /> Authentication successful! Redirecting to dashboard ...
              </p>
            </div>
          )}
          {!successSignUp && !successSignIn && (
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {isSignUp ? 'Create Account' : 'Sign in to your account'}
            </h2>
          )}
        </div>
        {!successSignUp && !successSignIn && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {!isSignUp && (
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-primary hover:text-secondary">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleAuthAction}
                  disabled={successSignUp || successSignIn}
                >
                  {isSignUp ? 'Create Account' : 'Sign in'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              {isSignUp ? 'Already a member? ' : 'Not a member? '}
              <Link href={isSignUp ? '/login' : '/signup'}>
                <span className="font-semibold leading-6 text-primary hover:text-secondary">
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </span>
              </Link>
              {/* &nbsp; or &nbsp;
              <span
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={handleAnonymousLogin}
              >
                Login Anonymously
              </span> */}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
