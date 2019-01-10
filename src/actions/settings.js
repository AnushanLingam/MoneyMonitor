import database from '../firebase/firebase';
import numeral from 'numeral';
require('numeral/locales/en-gb');
require('numeral/locales/fr');

export const setCurrency = (currency) => ({
    type: "SET_CURRENCY",
    currency
});

export const startSetCurrency = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/preferences/currency`).once("value").then( (snapshot) => {
            const currency = snapshot.val() || "en-gb";
            numeral.locale(currency);
            dispatch(setCurrency(currency));
        }).catch( (e) => {
            console.log(e);
        });
    };
};

export const startUpdateCurrency = (currency) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/preferences/currency`).set(currency).then(() => {
            numeral.locale(currency);
            dispatch(setCurrency(currency));
        }).catch((e) => {
            console.log(e);
        });
    };  
};