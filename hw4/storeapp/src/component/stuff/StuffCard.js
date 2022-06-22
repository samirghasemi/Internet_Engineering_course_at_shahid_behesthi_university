import React from 'react';
import {Link} from 'react-router-dom'
import addToCartLogo from '../../shopping-cart.png';
import {bindActionCreators} from "redux";
import {addToCart} from "../../redux/shopping/shopping-actions";
import {connect} from "react-redux";

class StuffCard extends React.Component {
    render() {
        return (<div className='stuff-card'>
            <img className="card-img" src={this.props.stuff.img} alt=""/>
            <div className='card-body'>
                <div className='card-title'>
                        <Link className='card-body-link' to={"/stuffs/" + this.props.stuff.id}>
                            <h3>{this.props.stuff.title}</h3>
                        </Link>
                </div>
                <div className='card-description'>
                    <p>{"R$"+this.props.stuff.price}</p>
                    <p>{this.props.stuff.size}</p>
                </div>
                <a className='card-btn' onClick={() => this.props.addToCartD(this.props.stuff.id)}>
                    Add to cart <img className='addToCartbtn' src={addToCartLogo} alt=""/>
                </a>
            </div>
        </div>);
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCartD: addToCart}, dispatch);
};

export default connect(null,mapDispatchToProps)(StuffCard)