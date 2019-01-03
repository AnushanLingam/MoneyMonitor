import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/budget';
import { history } from '../routers/AppRouter';

class AddExpenseModal extends React.Component {

    handleAddExpense = (expense) => {
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
                <div className="form__buttons">
                    <h3 className="modal__title--2">Add Expense</h3>
                    <button className=" button button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
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