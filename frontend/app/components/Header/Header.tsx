"use client";

import React, {useState} from 'react'
import Link from 'next/link'; 
import './Header.css'

function Header() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


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
                <li className='menu-item'> <Link href='/createbooking' className='menu-links' onClick={closeMobileMenu}> Dashboard</Link></li>
                <li className='menu-item'> <Link href='/help' className='menu-links' onClick={closeMobileMenu}> Help</Link> </li>
                <li className='menu-item'> <Link href='/' className='menu-links' onClick={closeMobileMenu}> Admin</Link></li>
                <li className='menu-item'> <Link href='/login' className='menu-links' onClick={closeMobileMenu}> <button className='login-button'>Log In</button></Link></li>
            </ul>
        </div>

        
    </div>
    </nav>
  )
}

export default Header
