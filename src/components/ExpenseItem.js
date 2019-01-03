import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

import EditExpenseModal from './EditExpenseModal';

class ExpenseItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
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

            <div className="list-item" onClick={this.handleShowModal}>
                <div>
                    <h3 className="list-item__title">{this.props.title}</h3>
                    <span className="list-item__subtitle">{moment(this.props.createdAt).format("Do MMM, YYYY")}</span>
                </div>
                <h3 className="list-item__data">{numeral(this.props.amount / 100).format("$0,0.00")}</h3>
                <EditExpenseModal showModal={this.state.showModal} hideModal={this.handleCloseModal} id={this.props.id} expense={
                    {
                        title: this.props.title,
                        amount: this.props.amount,
                        createdAt: this.props.createdAt,
                        note: this.props.note,
                    }
                }/>
            </div>
    
        )
    }
}


export default ExpenseItem;

