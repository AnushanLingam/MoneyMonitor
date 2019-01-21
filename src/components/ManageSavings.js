import React from 'react';

import AddSavingModal from './AddSavingModal';

class ManageSavings extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showSavingModal: false,
        };
    } 
    
    handleCloseSavingModal= () => {
        this.setState({
            showSavingModal: false
        }) 
    }

    handleShowSavingModal = () => {
        this.setState({
            showSavingModal: true
        });
    }
    
    render() {
        return (
            <div className="content-container--alt">
                <div className="manageExpenses__button">
                    <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"} onClick={this.handleShowSavingModal}>Add Saving Tracker</button>
                </div>
                <AddSavingModal showModal={this.state.showSavingModal} hideModal={this.handleCloseSavingModal}/>
            </div>
        )
    }
}

export default ManageSavings;