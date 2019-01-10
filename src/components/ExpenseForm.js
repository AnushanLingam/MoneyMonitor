import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.expense ? props.expense.title : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            focused: false,
            error: ""
        }
    }


    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }))
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        };
    };

    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }));
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ focused }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.title || !this.state.amount) {
            this.setState(() => ({ error: "Please enter a description and amount." }))
        } else {
            this.setState(() => ({ error: "" }))
            this.props.onSubmit({
                title: this.state.title,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }

    }

    render() {
        return (

            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Title"
                    autoFocus
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    className="text-input"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    className="text-input"
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.focused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}

                />
                <textarea
                    placeholder="Add a note about expense. (Optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                    className="text-area"

                />

                <div className="form__buttons">
                    {this.props.expense ? <button className="button">Save Expense</button> : <button className="button">Add Expense</button>}
                    {this.props.expense && <button onClick={this.props.removeExpense} className="button">Delete</button>}
                </div>
               
            </form>

        );
    }
};

export default ExpenseForm;