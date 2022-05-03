import React from 'react';
import NotFound from "./NotFound";
import addToCart from "../shopping-cart.png";
import ReactStars from "react-rating-stars-component";
import DetailModal from "./DetailModal";






export default class Stuff extends React.Component {
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
    componentDidMount() {
        const id =this.props.match.params.id;
        fetch('http://localhost:9176/stuff/' + id)
            .then(res => res.json())
            .then(stuff => this.setState({'stuff': stuff})
            ).catch(e => this.setState({error: true}))
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
                        <button className='stuff-detail-buy'>Buy Now  <img className='addToCartbtn' src={addToCart} alt=""/></button>
                        <button className='stuff-detail-info' onClick={this.openModal}>More Info</button>
                    </div>
                    <DetailModal detail={this.state.stuff.detail} isOpen={this.state.isModalOpen} onClose={this.closeModal}/>

                </div> : <NotFound/>

        );
    }
}

