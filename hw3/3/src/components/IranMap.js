import React from 'react';

import './IranMap.css';

import CityModal from './CityModal';
import cityModal from "./CityModal";


class IranMap extends React.Component {

    state = {
        citiesData: null,
        selectedCity: null,
        isModalOpen: false,
    };

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         movies: []
    //     };
    // }

    componentDidMount() {
        fetch('http://localhost:9000/cities/').then(res => res.json()).then(citiesData  =>
            this.setState({'citiesData': citiesData })
        );
    }


    cityClicked = (id) => (event) => {
        event.preventDefault();
        // Fetch city details and open modal
        fetch('http://localhost:9000/cities/'+id).then(res => res.json()).then(selectedCity  =>
            this.setState({'selectedCity': selectedCity })
        );
        this.state.isModalOpen = true;
    };

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    render() {
        return (
            <div>
                <div className="map-container">
                    {(this.state.citiesData || []).map((record) => (
                        <div
                            key={record.id}
                            className="city-name"
                            style={{
                                top: `${record.top}%`,
                                left: `${record.left}%`,
                            }}
                            onClick={this.cityClicked(record.id)}
                        >
                            {record.name}
                        </div>
                    ))}
                </div>
                <CityModal
                    city={this.state.selectedCity}
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                />
            </div>
        );
    }
}

export default IranMap;
