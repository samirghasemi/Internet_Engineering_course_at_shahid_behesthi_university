import React from 'react';
import {Link} from 'react-router-dom'
import CartCard from "./CartCard";
import {connect} from "react-redux";
import StuffCard from "../stuff/StuffCard";
import {bindActionCreators} from "redux";
import {addToCart, deleteFromCart, removeAllFromCart} from "../../redux/shopping/shopping-actions";

class Cart extends React.Component {
    calculate_total(){
        let price =0 ;
        this.props.cart.forEach(item =>
            price += item.qty * item.price
        )
        return price;
    }
    constructor(props) {
        super(props);
        console.log(this.props.cart.length)
    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.cart
                        .map(stuff =>
                            <CartCard key={stuff.id} stuff={stuff}/>
                        )
                    }
                </div>
                <div className={this.props.cart.length > 0 ?'': 'hide-class'}>
                    <div className='cart-total'>
                        <h1>
                            {"Total: R$" + this.calculate_total()}
                        </h1>
                    </div>
                    <div className='cart-checkout'>
                        <button onClick={() => this.props.removeAllFromCartD()}>CheckOut</button>
                    </div>
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({removeAllFromCartD: removeAllFromCart}, dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Cart)


