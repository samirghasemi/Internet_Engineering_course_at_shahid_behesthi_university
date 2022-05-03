import React from 'react';
import {Link} from 'react-router-dom';
import removeLogo from "../../remove2.png";
import plusLogo from "../../plus.png";
import minusLogo from "../../minus.png";
import {bindActionCreators} from "redux";
import {addToCart, deleteFromCart, removeFromCart} from "../../redux/shopping/shopping-actions";
import {connect} from "react-redux";


class CartCard extends React.Component {
    render() {
        return (
            <div className='cart-card'>
                <img className='stuff-image' src={this.props.stuff.img} alt=""/>
                <Link className='card-body-link cart-card-title' to={"/stuffs/" + this.props.stuff.id}>
                    <h2>{this.props.stuff.title}</h2>
                </Link>
                <p>{"R$ " + this.props.stuff.price}</p>
                <p>{this.props.stuff.qty}</p>
                <img className='stuff-remove-image' src={plusLogo} alt="" onClick={() => this.props.addToCartD(this.props.stuff.id)}/>
                <img className='stuff-remove-image' src={minusLogo} alt="" onClick={() => this.props.deleteFromCartD(this.props.stuff.id)}/>
                <img className='stuff-remove-image' src={removeLogo} alt="" onClick={() => this.props.removeFromCartD(this.props.stuff.id)}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({removeFromCartD: removeFromCart , addToCartD: addToCart ,deleteFromCartD: deleteFromCart }, dispatch);
};

export default connect(null,mapDispatchToProps)(CartCard)