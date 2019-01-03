import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header id="expenses" className={"header"}>
        <div className={"content-container"}>
            <div className={"header__content"}>
                <Link className={"header__title"} to="/dashboard"><h1>Money Monitor</h1></Link>

                <div className="show-for-desktop">
                    <a className="button--link button " href="#expenses">Expenses</a>
                    <a className="button--link button " href="#savings-tracker">Savings</a>
                </div>
                <button className="button--link button " onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})


export default connect(undefined, mapDispatchToProps)(Header);