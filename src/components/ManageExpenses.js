import React from 'react';

import AddExpenseModal from './AddExpenseModal';
import ExpenseFilters from './ExpenseFilters';

class ManageExpenses extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal: false
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
    
    render() {
        return (
            <div className="manageExpenses">
                <div className="manageExpenses__button"><button className="button--2" onClick={this.handleShowModal}>Add Expense</button></div>
                <ExpenseFilters />
                <AddExpenseModal showModal={this.state.showModal} hideModal={this.handleCloseModal}/>
            </div>
        )
    }
}

export default ManageExpenses;