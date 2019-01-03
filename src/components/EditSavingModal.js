import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditSaving, startRemoveSaving } from '../actions/saving';
import { history } from '../routers/AppRouter';
import SavingsForm from './SavingsForm';

class EditSavingModal extends React.Component {

    handleEditSaving = (saving) => {
        console.log(this.props.id, saving);
        this.props.startEditSaving(this.props.id, saving);
        history.push("/");
    }

    handleDeleteSaving = () => {
        this.props.startRemoveSaving(this.props.id);
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
                    <h3 className="modal__title--2">Add Saving Goal</h3>
                    <button className=" button button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                <SavingsForm saving={this.props.saving} removeSaving={this.handleDeleteSaving} onSubmit={this.handleEditSaving} />
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditSaving: (id, saving) => dispatch(startEditSaving(id, saving)),
        startRemoveSaving: (id) => dispatch(startRemoveSaving(id))
    };
}

export default connect(undefined, mapDispatchToProps)(EditSavingModal);