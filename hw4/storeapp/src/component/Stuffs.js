import React from 'react';
import {Link} from 'react-router-dom'
import StuffList from "./StuffList";

export default class Stuffs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffs: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:9176/stuff')
            .then(res => res.json())
            .then(stuffs => this.setState({'stuffs': stuffs}))
    }

    render() {
        return (
            <div className='container'>
                <StuffList stuffs={this.state.stuffs} type={this.props.type}/>
            </div>
        );
    }
}
