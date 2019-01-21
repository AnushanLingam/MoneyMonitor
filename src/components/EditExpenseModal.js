import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import getCategories from '../selectors/categories';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/budget';
import { history } from '../routers/AppRouter';

class EditExpenseModal extends React.Component {

    handleEditExpense = (expense) => {
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
                className={this.props.theme === "dark" ? "modal--dark" : "modal"}
            >
                <div className={this.props.theme === "dark" ? "form__buttons--dark" : "form__buttons"}>
                    <h3 className="modal__title--2">Edit Expense</h3>
                    <button className=" button--3 button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                <ExpenseForm theme={this.props.theme} expense={this.props.expense} categories={this.props.categories} removeExpense={this.handleDeleteExpense} onSubmit={this.handleEditExpense} />

            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: getCategories(state.settings.defaultCategories, state.settings.userCategories),
    theme: state.settings.theme
})

const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseModal);