import React from 'react';
import {Link} from 'react-router-dom'
import StuffList from "./StuffList";
import {connect} from "react-redux";

class Stuffs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffs: [],
        };
    }

    //using server
    // componentDidMount() {
    //     console.log(this)
    //     fetch('http://localhost:9176/stuff')
    //         .then(res => res.json())
    //         .then(stuffs => this.setState({'stuffs': stuffs}))
    // }
    //

    //using redux
    componentDidMount() {
        this.setState({'stuffs': this.props.products})
    }

    render() {
        return (
            <div className='container'>
                <StuffList stuffs={this.state.stuffs} type={this.props.type}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        products: state.shop.products,
    };
};

export default connect(mapStateToProps)(Stuffs)