import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';

export const Header = ({ startLogout, auth }) => (
    <header id="expenses" className={"header"}>
        <div className={"content-container"}>
            <div className={"header__content"}>
                <Link className={"header__title"} to="/dashboard"><h1>Money Monitor</h1></Link>


                {
                    history.location.pathname == "/dashboard" &&
                    <div className="show-for-desktop">
                        <a className="button--link button " href="#expenses">Expenses</a>
                        <a className="button--link button " href="#savings-tracker">Savings</a>
                    </div>
                }

                {
                    history.location.pathname != "/settings" &&
                    <Link to="/settings"><img className="profilePicture" src={auth.photoURL} /></Link>
                }


            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
