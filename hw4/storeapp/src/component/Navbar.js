import React from 'react';
import {Link} from 'react-router-dom'
import addToCartLogo from "../shopping-cart.png";
import {connect} from "react-redux";

class Navbar extends React.Component{
    cart_counter(){
        let count =0 ;
        this.props.cart.forEach(item =>
            count += item.qty
        )
        return count;
    }

    render(){
        return (
            <div className='navbar'>
                <div className="navbar-items">
                    <Link className='card-body-link' to={"/stuffs"}>
                        <p className='navbar-item'>AllProducts</p>
                    </Link>
                    <Link className='card-body-link' to={"/smartphones"}>
                        <p className='navbar-item'>Smartphones</p>
                    </Link>
                    <Link className='card-body-link' to={"/laptops"}>
                        <p className='navbar-item'>Notebooks</p>
                    </Link>
                    <Link className='card-body-link' to={"/cart"}>
                        <div className='navbar-item-cart'>
                            Cart <img className='addToCartbtn' src={addToCartLogo} alt=""/>
                            <div className={this.props.cart.length > 0 ?'navbar-item-cart-counter': 'hide-class navbar-item-cart-counter'}>
                                <p>{this.cart_counter()}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        cart: state.shop.cart,
    };
};

export default connect(mapStateToProps)(Navbar)