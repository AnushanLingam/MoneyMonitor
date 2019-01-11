import React from 'react';
import Modal from 'react-modal';

class WarningModal extends React.Component {

    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Warning"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <h2 className="modal__title--2">Warning</h2>
                <h3 className="modal__title--2">This will delete all {this.props.message} permanently.</h3>
                <button className="button" onClick={this.props.deleteAll}>Delete All {this.props.message}</button>
            </Modal>
        );
    }
}

export default WarningModal;