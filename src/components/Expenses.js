import React from 'react';
import { connect } from 'react-redux';
import ExpenseItem from './ExpenseItem';
import selectExpenses from '../selectors/expenses';
import getCategories from '../selectors/categories'

import EditExpenseModal from './EditExpenseModal';

class Expenses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            activeExpense: {},
        };
    } 
    
    handleCloseModal= () => {
        this.setState({
            showModal: false
        }) 
    }

    handleShowModal = () => {
        this.setState({
            showModal: true
        });
    }

    handleEdit = (id) => {
        const activeExpense = this.props.expenses.find(expense => expense.id === id);
        this.setState({
            activeExpense: activeExpense
        });
        this.handleShowModal();
    }

    render() {
        return (
            <div className="content-container--alt">

                <div className="list-header">
                    <div className="show-for-mobile">Expenses</div>
                    <div className="show-for-desktop">Expense</div>
                    <div className="show-for-desktop">Amount</div>
                </div>

                <div className="list-body">

                    {
                        this.props.expenses.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No Expenses</span>
                            </div>
                        ) : (
                                this.props.expenses.map((expense) => {
                                    return <ExpenseItem editExpense={this.handleEdit} key={expense.id} {...expense} category={this.props.categories.find(category => category.id === expense.category)} />
                                })
                            )
                    }

                </div>
                <EditExpenseModal  showModal={this.state.showModal} hideModal={this.handleCloseModal} id={this.state.activeExpense.id} expense={this.state.activeExpense} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        categories: getCategories(state.settings.defaultCategories, state.settings.userCategories)
    };
}

export default connect(mapStateToProps)(Expenses);
