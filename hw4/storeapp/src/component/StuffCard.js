import React from 'react';
import {Link} from 'react-router-dom'
import addToCart from '../shopping-cart.png';

export default class StuffCard extends React.Component {
    render() {
        return (<div className='stuff-card'>
            <img className="card-img" src={this.props.stuff.img} alt=""/>
            <div className='card-body'>
                <Link to={"/stuffs/" + this.props.stuff.id}>
                    <h3>{this.props.stuff.title}</h3>
                </Link>
                <div className='card-description'>
                    <p>{this.props.stuff.price}</p>
                    <p>{this.props.stuff.size}</p>
                </div>
                <button className='card-btn'>Add to cart  <img className='addToCartbtn' src={addToCart} alt=""/></button>
            </div>
        </div>);
    }
}

