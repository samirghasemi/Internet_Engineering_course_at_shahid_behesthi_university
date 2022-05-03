import React from 'react';

import './DetailModal.css';


class DetailModal extends React.Component {

    render() {
        const {
            detail,
            isOpen,
            onClose,
        } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div className="dimmer">
                <div className="modal-container">
                    <h4>Details</h4>
                    <p>{detail}</p>
                    <div className='modal-detail'>
                        <button onClick={onClose}> Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailModal;
