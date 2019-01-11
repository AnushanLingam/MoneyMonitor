import React from 'react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const Login = ({ startLogin }) => (

    <div className={"box-layout"}>
        <Fade>
            <div className={"box-layout__box"}>
                <h1 className={"box-layout__title"}>Money Monitor</h1>
                <p>Take control of your spending.</p>
                <button className={"button"} onClick={startLogin}>Login with Google</button>
            </div>
        </Fade>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);