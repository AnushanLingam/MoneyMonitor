import React from 'react';
import Modal from 'react-modal';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditSaving, startRemoveSaving } from '../actions/saving';
import { history } from '../routers/AppRouter';
import SavingsForm from './SavingsForm';

class EditSavingModal extends React.Component {

    handleEditSaving = (saving) => {
        console.log(this.props.id, saving);
        this.props.startEditSaving(this.props.id, saving);
        history.push("/");
    }

    handleDeleteSaving = () => {
        this.props.startRemoveSaving(this.props.id);
        history.push("/");
    }



    render() {
        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Add Saving Goal"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className={this.props.theme === "dark" ? "modal--dark" : "modal"}
            >
                <div className={this.props.theme === "dark" ? "form__buttons--dark" : "form__buttons"}>
                    <h3 className="modal__title--2">Add Saving Goal</h3>
                    <button className=" button--3 button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                <SavingsForm theme={this.props.theme} saving={this.props.saving} removeSaving={this.handleDeleteSaving} onSubmit={this.handleEditSaving} />
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.settings.theme
})

const mapDispatchToProps = (dispatch) => {
    return {
        startEditSaving: (id, saving) => dispatch(startEditSaving(id, saving)),
        startRemoveSaving: (id) => dispatch(startRemoveSaving(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSavingModal);