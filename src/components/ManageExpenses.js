import React from 'react';

import AddExpenseModal from './AddExpenseModal';
import ExpenseFilters from './ExpenseFilters';

class ManageExpenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showExpenseModal: false
        };
    }



    handleCloseExpenseModal = () => {
        this.setState({
            showExpenseModal: false
        })
    }

    handleShowExpenseModal = () => {
        this.setState({
            showExpenseModal: true
        });
    }

    render() {
        return (
            <div className="content-container--alt2">
                <div className="content-container--top">
                    <div className="manageExpenses__button">
                        <button className="button--2" onClick={this.handleShowExpenseModal}>Add Expense</button>
                    </div>
                </div>

                <ExpenseFilters />
                <AddExpenseModal showModal={this.state.showExpenseModal} hideModal={this.handleCloseExpenseModal} />
            </div>
        )
    }
}

export default ManageExpenses;