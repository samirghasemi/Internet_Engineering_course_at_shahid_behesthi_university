import React from 'react';
import {Link} from 'react-router-dom'
import {useHistory, useParams} from 'react-router-dom'
import DetailModal from "./DetailModal";
import NotFound from "./NotFound";

export default class Stuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuff: {},
            error: false,
            isModalOpen: false,
            onClose: false,
        }
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

    componentDidMount() {
        // const id =this.props.match.params.id;
        const id = 0;
        fetch('http://localhost:9176/stuff/' + id)
            .then(res => res.json())
            .then(stuff => this.setState({'stuff': stuff})
            ).catch(e => this.setState({error: true}))
        console.log(this.stuff)
    }

    render() {
        return (
            !this.state.error ? <div>
                <div>
                    <img src={this.state.stuff.img} alt=""/>
                </div>
                <div>
                    <h3>{this.state.stuff.title}</h3>
                    <h4>{this.state.stuff.price}</h4>
                    <button>Buy Now</button>
                    <button onClick={this.openModal}>More Info</button>
                </div>

                {/*{this.state.isModalOpen} ? <NotFound/>: <div className="dimmer">*/}
                {/*<div className="modal-container">*/}
                {/*    <h3>details</h3>*/}
                {/*    <p>{this.state.stuff.detail}</p>*/}
                {/*    <button onClick={this.closeModal}>close</button>*/}
                {/*</div>*/}

            </div> : <NotFound/>

        );
    }
}

