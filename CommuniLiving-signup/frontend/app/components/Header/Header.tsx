"use client";

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link'; 
import './Header.css'

function Header() {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // useEffect(() => {
    //     // Check user authentication status on component mount
    //     checkUserAuthentication();
    // }, []);

    const checkUserAuthentication = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user_info/');

            if (response.data.username) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking user authentication:', error);
        }
    };

    const handleLogout = async () => {
        try {
          // Perform the logout API request or action here
          await axios.post('http://localhost:8000/api/logout/');
          localStorage.removeItem('access_token');
          setIsLoggedIn(false);
          closeMobileMenu();
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

      
  return (
    <nav>
    <div className='header-container'>
        <div>
            <Link href='/' onClick={closeMobileMenu}>
            <img src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png" alt='Company Logo' className='header-logo' />
            </Link>
        </div>
        <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <div>
            <ul className={click ? 'menu active' : 'menu'}>
                <li className='menu-item'> <Link href='/'  className='menu-links' onClick={closeMobileMenu}>Home</Link> </li>
                <li className='menu-item'> <Link href='/dashboard' className='menu-links' onClick={closeMobileMenu}> Dashboard</Link></li>
                <li className='menu-item'> <Link href='/messages' className='menu-links' onClick={closeMobileMenu}> Announcements</Link></li>
                <li className='menu-item'> <Link href='/help' className='menu-links' onClick={closeMobileMenu}> Help</Link> </li>
                {/* <li className='menu-item'> <Link href='/login' className='menu-links' onClick={closeMobileMenu}> <button className='login-button'>Log In</button></Link></li> */}
                <li className='menu-item'>
                    {isLoggedIn ? (
                        // If user is authenticated, show logout button
                        <Link href='/login' className='menu-links' onClick={handleLogout}> <button className='login-button'>Log Out</button></Link>
                    ) : (
                        <Link href='/login' className='menu-links' onClick={closeMobileMenu}> <button className='login-button'>Log In</button></Link>
                    )}
                </li>
            </ul>
        </div>

        
    </div>
    </nav>
  )
}

export default Header
