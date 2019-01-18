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
        if(this.state.name !== "") {
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
                className="modal"
            >
                <h2 className="modal__title--2">{this.props.message} Category</h2>
                
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
                        {this.props.category ? <button className="button">Save Category</button> : <button className="button">Add Category</button>}
                        {this.props.category && <button onClick={this.handleRemove} className="button">Delete</button>}
                    </div>
                </form>
            </Modal>
        );
    }
}

export default CategoryModal;