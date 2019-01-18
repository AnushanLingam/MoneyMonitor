import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getTotalExpenses from '../selectors/expenses-total';
import numeral from 'numeral';
import 'react-circular-progressbar/dist/styles.css';



export const ExpenseSummary = (props) => {
    const expenseText = props.expenseCount === 1 ? "expense" : "expenses";
    numeral.locale(props.currency);
    return (
        <div className="content-container">
            <div className="summary__container">
                <h1 className="page-header__title"><span>{props.expenseCount}</span> {expenseText} totalling <span>{numeral(props.expenseTotal / 100).format("$0,0.00")}</span></h1>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        expenseCount: selectExpenses(state.expenses, state.filters).length,
        expenseTotal: getTotalExpenses(selectExpenses(state.expenses, state.filters)),
        currency: state.settings.currency
    };
};

export default connect(mapStateToProps)(ExpenseSummary);