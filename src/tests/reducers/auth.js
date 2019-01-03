import authReducer from '../../reducers/auth';

test("Should add id to state when logged in", () => {
    const uid = 1234;
    const action = {
        type: "LOGIN",
        uid
    }
    const state = authReducer(undefined, action);
    
    expect(state).toEqual({uid});
});

test("Should remove uid when logged out", () => {
    const uid = 1234;
    const action = {
        type: "LOGOUT",
    };
    const state = authReducer({uid}, action);

    expect(state).toBeFalsy();
});