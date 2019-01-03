import React from 'react';
import { connect } from 'react-redux';
import SavingsCircle from './SavingsCircle';

class Savings extends React.Component {

    render() {
        return (
            <div className="content-container">
                <div className="savings__container">
                    {
                        this.props.savings.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No Savings Goals</span>
                            </div>
                        ) : (
                                this.props.savings.map((saving) => {
                                    return <SavingsCircle key={saving.id} {...saving} />
                                })
                            )
                    }
                </div>
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
