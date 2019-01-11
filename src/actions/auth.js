import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export const login = (uid, photoURL, displayName, email) => ({
    type: "LOGIN",
    uid,
    photoURL,
    displayName,
    email
});

export const logout = () => ({
    type: "LOGOUT"
});