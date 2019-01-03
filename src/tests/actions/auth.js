import {login, logout} from '../../actions/auth';

test("Should create login action", () => {
    const uid = 123;
    const result = login(uid);

    expect(result).toEqual({
        type: "LOGIN",
        uid
    });
});

test("Should create logout action", () => {
    const result = logout();

    expect(result).toEqual({
        type: "LOGOUT"
    });
});