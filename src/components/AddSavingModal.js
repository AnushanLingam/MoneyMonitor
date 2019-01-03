import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddSaving } from '../actions/saving';
import { history } from '../routers/AppRouter';

class AddSavingModal extends React.Component {

    handleAddExpense = (expense) => {
        this.props.startAddExpense(expense);
        history.push("/");
    }

    saving = () => {
         const saving = {
            title: "PS5",
            amount: 456,
            goal: 500
        }
        this.props.startAddSaving(saving);
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
                <button onClick={this.saving}>Save</button>
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