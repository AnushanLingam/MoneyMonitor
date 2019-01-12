import React from 'react';
import Fade from 'react-reveal/Fade';
import ManageExpenses from './ManageExpenses';
import ManageSavings from './ManageSavings';
import Expenses from './Expenses';
import ExpenseSummary from './ExpenseSummary';
import Savings from './Savings';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="content-container">

                <ManageExpenses />
                <Fade>
                    <ExpenseSummary />
                    <Expenses />
                    <ManageSavings />
                    <Savings />
                </Fade>


            </div>
        );
    }
}
export default DashboardPage;