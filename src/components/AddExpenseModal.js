import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/budget';
import { history } from '../routers/AppRouter';
import getCategories from '../selectors/categories';


// Add className to modal ?
// Create Own Modal 

class AddExpenseModal extends React.Component {

    handleAddExpense = (expense) => {
        this.props.startAddExpense(expense);
        history.push("/");
    }

    render() {

        if(this.props.theme === "dark") {
            Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.75)";
        }

        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Add Expense"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className={this.props.theme === "dark" ? "modal--dark" : "modal"}
            >
                <div className="form__buttons">
                    <h3 className="modal__title--2">Add Expense</h3>
                    <button className=" button--3 button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                <ExpenseForm theme={this.props.theme} categories={this.props.categories} onSubmit={this.handleAddExpense} />
                
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
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseModal);