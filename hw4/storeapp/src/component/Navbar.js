import React from 'react';
import {Link} from 'react-router-dom'
import addToCart from "../shopping-cart.png";

export default function Navbar() {

    return (
        <div className='navbar'>
            <div className="navbar-items">
                <a className='navbar-item' href="/stuffs">AllProducts</a>
                <a className='navbar-item' href="/smartphones">Smartphones</a>
                <a className='navbar-item' href="/laptops">Notebooks</a>
                <Link className='card-body-link' to={"/cart"}>
                    Cart <img className='addToCartbtn' src={addToCart} alt=""/>
                </Link>
            </div>
        </div>
    );
}
