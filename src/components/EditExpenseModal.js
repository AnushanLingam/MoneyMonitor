import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/budget';
import {history} from '../routers/AppRouter';

class EditExpenseModal extends React.Component {

    handleEditExpense= (expense) => {
        console.log(this.props.id, expense);
        this.props.startEditExpense(this.props.id, expense);
        history.push("/");
    }

    handleDeleteExpense = () => {
        this.props.startRemoveExpense(this.props.id);
        history.push("/");
    }

    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Edit Expense"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Edit Expense</h3>
                <ExpenseForm expense={this.props.expense} removeExpense={this.handleDeleteExpense} onSubmit={this.handleEditExpense} />
                <button onClick={this.props.hideModal} >Cancel</button>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
}

export default connect(undefined, mapDispatchToProps)(EditExpenseModal);