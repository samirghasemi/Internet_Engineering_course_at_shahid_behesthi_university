import React from 'react';

import './DetailModal.css';


class DetailModal extends React.Component {

    render() {
        const {
            city,
            isOpen,
            onClose,
        } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div onClick={onClose} className="dimmer">
                <div className="modal-container">
                    <h3>details</h3>
                    <p>{this.state.stuff.detail}</p>
                </div>
            </div>
        );
    }
}

export default DetailModal;
