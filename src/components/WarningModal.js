import React from 'react';
import Modal from 'react-modal';

class WarningModal extends React.Component {

    render() {

        if(this.props.theme === "dark") {
            Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.75)";
        }

        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Warning"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className={this.props.theme === "dark" ? "modal--dark" : "modal"}
            >
                <h2 className="modal__title--2">Warning</h2>
                <h3 className="modal__title--2">This will delete all {this.props.message} permanently.</h3>
                <div className="form__buttons">
                    <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"} onClick={this.props.deleteAll}>Delete All {this.props.message}</button>
                    <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"} onClick={this.props.hideModal}>Cancel</button>
                </div>

            </Modal>
        );
    }
}

export default WarningModal;