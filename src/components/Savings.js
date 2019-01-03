import React from 'react';
import { connect } from 'react-redux';
import SavingsCircle from './SavingsCircle';
import EditSavingModal from './EditSavingModal';

class Savings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            activeSaving: {},
        };
    } 
    
    handleCloseModal= () => {
        this.setState({
            showModal: false
        }) 
    }

    handleShowModal = () => {
        this.setState({
            showModal: true
        });
    }

    handleEdit = (id) => {
        const activeSaving = this.props.savings.find(saving => saving.id === id);
        this.setState({
            activeSaving: activeSaving
        });
        this.handleShowModal();
    }

    render() {
        return (
            <div id="savings-tracker" className="content-container">
                <div className="savings__container">
                    {
                        this.props.savings.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No Savings Goals</span>
                            </div>
                        ) : (
                                this.props.savings.map((saving) => {
                                    return <SavingsCircle editSaving={this.handleEdit} key={saving.id} {...saving} />
                                })
                            )
                    }
                </div>
                <EditSavingModal showModal={this.state.showModal} hideModal={this.handleCloseModal} id={this.state.activeSaving.id} saving={this.state.activeSaving} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        savings: state.savings
    };
}

export default connect(mapStateToProps)(Savings);
