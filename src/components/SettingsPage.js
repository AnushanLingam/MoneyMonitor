import React from 'react';
import WarningModal from './WarningModal';
import CategoryModal from './CategoryModal';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import { startUpdateCurrency, startAddCategory, startEditCategory, startRemoveCategory } from '../actions/settings';
import { startRemoveAllExpenses } from '../actions/budget';
import { startRemoveAllSavings } from '../actions/saving';
import { startLogout } from '../actions/auth';

class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseWarning: false,
            savingsWarning: false,
            selectedCategory: "",
            addCategoryModal: false,
            editCategoryModal: false
        };
    };

    handleChangeCategory = (e) => {
        const category = e.target.value;
        this.setState({
            selectedCategory: category
        });
    };

    handleCloseExpenseModal = () => {
        this.setState({
            expenseWarning: false
        });
    };

    handleShowExpenseModal = () => {
        this.setState({
            expenseWarning: true
        });
    };

    handleCloseSavingsModal = () => {
        this.setState({
            savingsWarning: false
        });
    };

    handleShowSavingsModal = () => {
        this.setState({
            savingsWarning: true
        });
    };

    handleShowAddCategoryModal = () => {
        this.setState({
            addCategoryModal: true
        });
    };

    handleCloseAddCategoryModal = () => {
        this.setState({
            addCategoryModal: false,
            selectedCategory: ""
        });
    };
    
    handleShowEditCategoryModal = () => {
        this.setState({
            editCategoryModal: true
        });
    };

    handleCloseEditCategoryModal = () => {
        this.setState({
            editCategoryModal: false,
            selectedCategory: ""
        });
    };

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

    addCategory = (category) => {
        this.props.startAddCategory(category);
        this.handleCloseAddCategoryModal();
        this.setState({
            selectedCategory: ""
        })
    }

    editCategory = (category) => {
        this.props.startEditCategory(category.id, {name: category.name})
        this.handleCloseEditCategoryModal()
    }

    removeCategory = (category) => {
        this.props.startRemoveCategory(category.id);
        this.handleCloseEditCategoryModal()
    }

    render() {
        return (
            <div className="content-container">
                
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
                    <div className="settings__option">
                        <h2>Categories</h2>
                        <div className="settings__category-container">
                            <div className="settings__category-option">
                                <button className="button" onClick={this.handleShowAddCategoryModal}>Add Category</button>
                            </div>
                            <div className="settings__category-option">
                                <select className="select--alt" value={this.state.selectedCategory} onChange={this.handleChangeCategory}>
                                    <option value="">Select Category to Edit</option>
                                    {
                                        this.props.settings.userCategories.map((category) => {
                                            return <option key={category.name} value={category.name} >{category.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="settings__category-option">
                                <button className="button" disabled={this.props.settings.userCategories.length > 0 && this.state.selectedCategory !== "" ? false : true} onClick={this.handleShowEditCategoryModal}>Edit Category</button>
                            </div>
                        </div>
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
                    <CategoryModal showModal={this.state.addCategoryModal} submitAction={this.addCategory} hideModal={this.handleCloseAddCategoryModal} message="Add"/>
                    {this.state.selectedCategory !== "" && 
                        <CategoryModal category={this.props.settings.userCategories.find(category => category.name === this.state.selectedCategory)} showModal={this.state.editCategoryModal} removeCategory={this.removeCategory} submitAction={this.editCategory} hideModal={this.handleCloseEditCategoryModal} message="Edit"/>
                    }
  

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
    startLogout: () => dispatch(startLogout()),
    startAddCategory: (category) => dispatch(startAddCategory(category)),
    startEditCategory: (id, updates) => dispatch(startEditCategory(id, updates)),
    startRemoveCategory: (id) => dispatch(startRemoveCategory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);