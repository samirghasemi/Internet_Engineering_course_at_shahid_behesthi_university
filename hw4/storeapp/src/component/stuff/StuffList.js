import React from 'react';
import {Link} from 'react-router-dom'
import StuffCard from "./StuffCard";

export default class StuffList extends React.Component {
    render() {
        return (
            <div className='card-list'>
                {
                    this.props.stuffs
                    .filter(stuff =>
                        stuff.category === this.props.type || this.props.type==='')
                    .map(stuff =>
                    <StuffCard key={stuff.id} stuff={stuff}/>
                    )
                }
            </div>
        );
    }
}
