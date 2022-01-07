import React from 'react'

export default function Navbar() {
    const pathName = window.location.pathname

    return (
        <div className='nav' id='head-nav'>
            <a href='/' id = 'firstcast' >FirstCast</a>
            <a href='/home' className = {pathName === '/home' || pathName === '/' ? 'active' : ''}>Home</a>
            <a href='/about' className = {pathName === '/about' ? 'active' : ''}>About</a>
            <a href='/contact' className = {pathName === '/contact' ? 'active' : ''}>Contact</a>
            <a href='/login' className = {pathName === '/login' ? 'active' : ''}>Login</a>
        </div>
    )
}