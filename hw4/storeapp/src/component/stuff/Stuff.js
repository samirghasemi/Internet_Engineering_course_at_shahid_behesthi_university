import React from 'react';
import NotFound from "../NotFound";
import addToCartLogo from "../../shopping-cart.png";
import ReactStars from "react-rating-stars-component";
import DetailModal from "../modal/DetailModal";
import {connect} from "react-redux";
import {addToCart} from "../../redux/shopping/shopping-actions"
import {bindActionCreators} from "redux";






class Stuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuff: {},
            error: false,
            isModalOpen: false
        }
    }


    ratingChanged = (newRating) => {
        console.log(newRating);
    };
    //using server
    // componentDidMount() {
    //     const id =this.props.match.params.id;
    //     fetch('http://localhost:9176/stuff/' + id)
    //         .then(res => res.json())
    //         .then(stuff => this.setState({'stuff': stuff})
    //         ).catch(e => this.setState({error: true}))
    // }

    //using redux
    componentDidMount() {
        const id =this.props.match.params.id;
        let product = this.props.products.find(prod => prod.id == id)
        if(product==null){
            this.setState({'error': true})
        }
        this.setState({'stuff': product})
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };
    openModal = () => {
        this.setState({
            isModalOpen: true,
        });
    };

    render() {

        return (
            !this.state.error ?
                <div className='stuff'>
                    <div className='stuff-img'>
                        <img src={this.state.stuff.img} alt=""/>
                        <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={50}
                            activeColor="#ffd700"
                        />
                        <div className='review'>
                            <p>1 reviews.</p>
                        </div>
                    </div>
                    <div className='stuff-detail'>
                        <h2>{this.state.stuff.title}</h2>
                        <h4>{"R$"+this.state.stuff.price}</h4>
                        <a className='stuff-detail-buy' onClick={() => this.props.addToCartD(this.state.stuff.id)}>Buy Now  <img className='addToCartbtn' src={addToCartLogo} alt=""/></a>
                        <a className='stuff-detail-info' onClick={this.openModal}>More Info</a>
                    </div>
                    <DetailModal detail={this.state.stuff.detail} isOpen={this.state.isModalOpen} onClose={this.closeModal}/>

                </div> : <NotFound/>

        );
    }
}


function mapStateToProps(state){
    return{
        products: state.shop.products
    };
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCartD: addToCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Stuff)