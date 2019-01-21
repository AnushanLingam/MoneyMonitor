import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startAddSaving } from '../actions/saving';
import { history } from '../routers/AppRouter';
import SavingsForm from './SavingsForm';

class AddSavingModal extends React.Component {

    handleAddSaving = (saving) => {
        this.props.startAddSaving(saving);
        history.push("/");
    }



    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Add Saving Goal"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <div className="form__buttons">
                    <h3 className="modal__title--2">Track Savings</h3>
                    <button className=" button--3 button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                <SavingsForm onSubmit={this.handleAddSaving} />
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddSaving: (saving) => dispatch(startAddSaving(saving))
    };
}

export default connect(undefined, mapDispatchToProps)(AddSavingModal);