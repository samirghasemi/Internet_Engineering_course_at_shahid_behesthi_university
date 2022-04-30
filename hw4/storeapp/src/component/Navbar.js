import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='navbar'>
            <div className="navbar-items">
                <a href="/stuffs">AllProducts</a>
                <a href="/smartphones">Smartphones</a>
                <a href="/laptops">Notebooks</a>
                <button className="">Cart</button>
            </div>
        </div>
    );
}
