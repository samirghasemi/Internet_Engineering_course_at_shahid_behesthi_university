import React from 'react';

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {}
        }
    }

    render() {
        return (
            <div className='movie-detail container'>
                <img className='movie-banner' src={this.state.movie.banner} alt=""/>
                <div className="detail-body">
                    <div>
                        <h2 className="card-title">{this.state.movie.title}
                            <span className='release-year'> {this.state.movie.release_year}</span>
                        </h2>
                        <div className='detail-description'>
                            <p className='card-description'>{this.state.movie.description}</p>
                        </div>
                    </div>
                    <div className='images'>
                        <img className='detail-img' src={this.state.movie.image} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
