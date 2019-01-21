import React from 'react';
import Modal from 'react-modal';

class CategoryModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.category ? this.props.category.name : "",
        }
    }

    // BREAK OUT FORM TO COMPONENT?
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({
            name
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== "") {
            this.props.submitAction({
                name: this.state.name,
                id: this.props.category ? this.props.category.id : ""
            })
        }
        this.setState({
            name: ""
        });
    }

    handleRemove = () => {
        this.props.removeCategory(this.props.category);
    }

    render() {

        return (
            <Modal
                isOpen={this.props.showModal}
                contentLabel="Category"
                appElement={document.getElementById("app")}
                onRequestClose={this.props.hideModal}
                closeTimeoutMS={200}
                className={this.props.theme === "dark" ? "modal--dark" : "modal"}
            >
                <div className={this.props.theme === "dark" ? "form__buttons--dark" : "form__buttons"}>
                    <h3 className="modal__title--2">{this.props.message} Category</h3>
                    <button className=" button--3 button--link button--modal" onClick={this.props.hideModal} >Cancel</button>
                </div>
                
                <form className="form" onSubmit={this.handleOnSubmit}>
                    <input
                        type="text"
                        placeholder="Category Name"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="text-input"
                    />
                    <div className="form__buttons">
                        {this.props.category ? <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Save Category</button> : <button className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Add Category</button>}
                        {this.props.category && <button onClick={this.handleRemove} className={this.props.theme === "dark" ? "button--2--dark" : "button--2"}>Delete</button>}
                    </div>
                </form>
            </Modal>
        );
    }
}

export default CategoryModal;