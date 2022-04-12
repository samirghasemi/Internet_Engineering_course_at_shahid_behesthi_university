import React from 'react';
import {Link} from 'react-router-dom';

export default class MovieCard extends React.Component {
    render() {
        return (
            <div className='movie-card'>
                <img className="card-img" src={this.props.movie.imageUrl} alt=""/>
                <div className="card-body">
                    <Link to={"/movies/" + this.props.movie.id}>
                        <h1>
                            {this.props.movie.title}
                        </h1>
                    </Link>
                    <p className='card-description'>
                        {this.props.movie.short_description}
                    </p>
                </div>
            </div>
        )
    }
}