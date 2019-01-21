import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


class SavingsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.saving ? props.saving.title : "",
            amount: props.saving ? (props.saving.amount).toString() : "",
            goal: props.saving ? (props.saving.goal).toString() : "",
            error: ""
        }
    }


    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }))
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        };
    };

    onGoalChange = (e) => {
        const goal = e.target.value;
        if (!goal || goal.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ goal }));
        };
    };


    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.title || !this.state.amount) {
            this.setState(() => ({ error: "Please enter a description and amount." }))
        } else {
            this.setState(() => ({ error: "" }))
            this.props.onSubmit({
                title: this.state.title,
                amount: parseInt(this.state.amount, 10),
                goal: parseInt(this.state.goal, 10)
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
                    placeholder="Current Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    className="text-input"
                />

                <input
                    type="number"
                    placeholder="Goal Amount"
                    value={this.state.goal}
                    onChange={this.onGoalChange}
                    className="text-input"
                />

                <div className="form__buttons">
                    {this.props.saving ? <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Save Tracker</button> : <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Add Tracker</button>}
                    {this.props.saving && <button onClick={this.props.removeSaving} className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Delete</button>}
                </div>

            </form>

        );
    }
};

export default SavingsForm;