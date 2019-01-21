import React from 'react';
import moment from 'moment';
import DatePicker from 'react-date-picker'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.expense ? props.expense.title : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            createdAt: props.expense ? moment(props.expense.createdAt).toDate() : moment().toDate(),
            focused: false,
            category: props.expense ? props.expense.category : "message",
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

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(() => ({ category }));
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
                note: this.state.note,
                category: this.state.category == "message" ? "" : this.state.category
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
                <div>
                    <DatePicker
                        value={this.state.createdAt}
                        onChange={this.onDateChange}
                        calendarClassName={this.props.theme === "dark" ? "calender-dark" : ""}
                    />
                </div>
                <select className="select--alt" value={this.state.category} onChange={this.onCategoryChange}>
                    <option value="message" >Select a category (optional)</option>
                    {
                        this.props.categories.map((category) => {
                            return <option key={category.name} value={category.id} >{category.name}</option>
                        })
                    }
                </select>
                <textarea
                    placeholder="Add a note about expense. (Optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                    className="text-area"

                />

                <div className="form__buttons">
                    {this.props.expense ? <button className="button--2">Save Expense</button> : <button className="button--2">Add Expense</button>}
                    {this.props.expense && <button onClick={this.props.removeExpense} className="button--2">Delete</button>}
                </div>

            </form>

        );
    }
};

export default ExpenseForm;
