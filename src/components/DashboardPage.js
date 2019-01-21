import React from 'react';
import Fade from 'react-reveal/Fade';
import ManageExpenses from './ManageExpenses';
import ManageSavings from './ManageSavings';
import Expenses from './Expenses';
import ExpenseSummary from './ExpenseSummary';
import Savings from './Savings';

import {connect} from 'react-redux';

class DashboardPage extends React.Component {

    render() {
        return (
            <div className={this.props.theme === "dark" ? "mainBackground--dark darkText" : "mainBackground"} >
                <div className="content-container">

                    <ManageExpenses theme={this.props.theme} />
                    <Fade>
                        <ExpenseSummary />
                        <Expenses />
                        <ManageSavings theme={this.props.theme} />
                        <Savings />
                    </Fade>


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.settings.theme
})
export default connect(mapStateToProps)(DashboardPage);