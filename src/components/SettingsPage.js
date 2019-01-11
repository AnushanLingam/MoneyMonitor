import React from 'react';
import WarningModal from './WarningModal';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import { startUpdateCurrency } from '../actions/settings';
import { startRemoveAllExpenses } from '../actions/budget';
import { startRemoveAllSavings } from '../actions/saving';
import { startLogout } from '../actions/auth';

class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseWarning: false,
            savingsWarning: false
        }
    }

    handleCloseExpenseModal = () => {
        this.setState({
            expenseWarning: false
        });
    }

    handleShowExpenseModal = () => {
        this.setState({
            expenseWarning: true
        });
    }

    handleCloseSavingsModal = () => {
        this.setState({
            savingsWarning: false
        });
    }

    handleShowSavingsModal = () => {
        this.setState({
            savingsWarning: true
        });
    }

    deleteAllExpenses = () => {
        this.props.startRemoveAllExpenses();
        this.setState({
            expenseWarning: false
        });
    }

    deleteAllSavings = () => {
        this.props.startRemoveAllSavings();
        this.setState({
            savingsWarning: false
        });
    }

    changeCurrency = (e) => {
        const currency = e.target.value;
        this.props.startUpdateCurrency(currency);
    }

    render() {
        return (
            <div className="content-container">
                <Fade>
                    <div className="profileContainer">
                        <div>
                            <img className="profilePicture--alt" src={this.props.auth.photoURL} />
                        </div>
                        <h3 className="page-header__title profile__username">{this.props.auth.displayName}</h3>
                        <button className="button" onClick={this.props.startLogout}>Logout</button>
                    </div>
                    <div className="summary__container">
                        <h1 className="page-header__title">Customise Preferences</h1>
                    </div>
                    <div className="settings__option">
                        <h2>Currency</h2>
                        <select className="select" value={this.props.settings.currency} onChange={this.changeCurrency}>
                            <option key="en-gb" value="en-gb">Pound (£)</option>
                            <option key="en" value="en">Dollar ($)</option>
                            <option key="fr" value="fr">Euro (€)</option>
                        </select>
                    </div>
                    <div className="summary__container">
                        <h1 className="page-header__title">Manage Your Data</h1>
                    </div>
                    <div className="settings__option">
                        <h2>Clear All Expenses</h2>
                        <button className="button" onClick={this.handleShowExpenseModal} disabled={this.props.expenses.length > 0 ? false : true}>Clear</button>
                    </div>
                    <div className="settings__option">
                        <h2>Clear All Trackers</h2>
                        <button className="button" onClick={this.handleShowSavingsModal} disabled={this.props.savings.length > 0 ? false : true}>Clear</button>
                    </div>
                    <WarningModal showModal={this.state.expenseWarning} deleteAll={this.deleteAllExpenses} hideModal={this.handleCloseExpenseModal} message="expenses" />
                    <WarningModal showModal={this.state.savingsWarning} deleteAll={this.deleteAllSavings} hideModal={this.handleCloseSavingsModal} message="trackers" />
                </Fade>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    settings: state.settings,
    expenses: state.expenses,
    savings: state.savings,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startUpdateCurrency: (data) => dispatch(startUpdateCurrency(data)),
    startRemoveAllExpenses: () => dispatch(startRemoveAllExpenses()),
    startRemoveAllSavings: () => dispatch(startRemoveAllSavings()),
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);