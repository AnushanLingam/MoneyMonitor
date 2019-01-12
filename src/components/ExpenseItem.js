import React from 'react';
import moment from 'moment';
import numeral from 'numeral';


class ExpenseItem extends React.Component {

    handleEdit = () => {
        this.props.editExpense(this.props.id)
    }

    render() {
        return (

            <div className="list-item" onClick={this.handleEdit}>
                <div>
                    <h3 className="list-item__title">{this.props.title}</h3>
                    <span className="list-item__subtitle">{moment(this.props.createdAt).format("Do MMM, YYYY")} {this.props.category && ` | ${this.props.category}`}</span>
                </div>
                <h3 className="list-item__data">{numeral(this.props.amount / 100).format("$0,0.00")}</h3>
            </div>

        )
    }
}

export default ExpenseItem;

