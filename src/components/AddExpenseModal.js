import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/budget';
import {history} from '../routers/AppRouter';

class AddExpenseModal extends React.Component {

    handleAddExpense= (expense) => {
        this.props.startAddExpense(expense);
        history.push("/");
    }

    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Add Expense"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className="modal"
            >
                <h3 className="modal__title">Add Expense</h3>
                <ExpenseForm onSubmit={this.handleAddExpense} />
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    };
}

export default connect(undefined, mapDispatchToProps)(AddExpenseModal);