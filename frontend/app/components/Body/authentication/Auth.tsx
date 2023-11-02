"use client";
import { useState } from 'react';
import Link from 'next/link';
// import { initFirebase } from '../../firebase/FirebaseApp';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
//   initFirebase();
//   const auth = getAuth();

  const handleNavigation = () => {
    router.push(isSignUp ? '/login' : '/signup');
  }

  const handleAnonymousLogin = () => {
    // signInAnonymously(auth)
    //   .then(() => {
    //     console.log('Signed in anonymously');
    //     router.push('/home');
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur during the sign-in process.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert('Trouble signing in anonymously. Please try again.');
    //     // ...
    //   });
  };

  const handleAuthAction = async () => {
    try {
       if (!email) {
          alert('Please enter an email');
          return;
        }
        if (!password) {
          alert('Please enter a password');
          return;
        }
      if (isSignUp) {
        if (!name) {
          alert('Please enter a name');
          return;
        }
        if (!confirmPassword) {
          alert('Please confirm your password');
          return;
        }

        if (password !== confirmPassword) {
          setConfirmPassword('');
          setPassword('');
          alert('Passwords do not match');
          return;
        }
  
        // const result = await createUserWithEmailAndPassword(auth, email, password);
        // await updateProfile(result.user, {
        //   displayName: name,
        // });

        setSuccessSignUp(true);


      setTimeout(() => {
        router.push('/');
      }, 1500);
        
      } else {
        // await signInWithEmailAndPassword(auth, email, password);
        setSuccessSignIn(true);
        setEmail('');
        setPassword('');
        setTimeout(() => {
        router.push('/login');
      }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        alert('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        alert('User not found');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use');
      } else {
        alert('An error occurred');
      }
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    }
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
            alt="Your Company"
          />
          {successSignUp && 
              <div> 
                <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faSpinner} spin /> Account created successfully.
                </p>
                <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faCheckCircle} spin /> Redirecting to sign-in page...
                </p>
            </div> 
          }
          {successSignIn && 
              <div> 
                <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <FontAwesomeIcon icon={faCheckCircle} spin /> Authentication successful! Redirecting to dashboard ...
                </p>
            </div> 
          }
          {!successSignUp && !successSignIn && 
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isSignUp ? 'Create Account' : 'Sign in to your account'}
          </h2>
          }
        </div>
        {!successSignUp && !successSignIn && 
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
                {isSignUp && (
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
            {isSignUp ? "Already a member? " : "Not a member? "}
            {/* <a 
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={handleNavigation}
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </a> */}
            <Link href={isSignUp ? "/login" : "/signup"}>
              <span className="font-semibold leading-6 text-primary hover:text-secondary">
                {isSignUp ? "Sign In" : "Create Account"}
              </span>
            </Link>
             {/* &nbsp; or &nbsp; 
            <a 
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={handleAnonymousLogin}
            >
              Login Anonymously
            </a> */}
          </p>
        </div>
    }
      </div>
      
    </>
  );
}
