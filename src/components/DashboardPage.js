import React from 'react';

import ManageExpenses from './ManageExpenses';
import ManageSavings from './ManageSavings';
import Expenses from './Expenses';
import ExpenseSummary from './ExpenseSummary';
import Savings from './Savings';

class DashboardPage extends React.Component {
    render() {
        return(
            <div className="content-container">
                <ManageExpenses />
                <ExpenseSummary />
                <Expenses />
                <ManageSavings />
                <Savings />
            </div>
        );
    }
}
export default DashboardPage;