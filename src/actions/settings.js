import database from '../firebase/firebase';
import numeral from 'numeral';
require('numeral/locales/en-gb');
require('numeral/locales/fr');

export const setCurrency = (currency) => ({
    type: "SET_CURRENCY",
    currency
});

export const setCategories = (categories) => ({
    type: "SET_USER_CATEGORIES",
    categories
});

export const startSetPreferences = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/preferences`).once("value").then( (snapshot) => {
            const currency = snapshot.child("currency").val() || "en-gb";
            numeral.locale(currency);
            dispatch(setCurrency(currency));
            const userCategories = []
            const childSnapshot = snapshot.child("userCategories");
            childSnapshot.forEach((category) => {
                userCategories.push({
                    id: category.key,
                    ...category.val()
                });
            });
            dispatch(setCategories(userCategories));
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

export const addCategory = (category) => ({
    type: "ADD_CATEGORY",
    category
})

export const startAddCategory = (categoryData = {}) => {
    return (dispatch, getState) => {
        const {
            name = ""
        } = categoryData;
        const uid = getState().auth.uid;

        const category = {name};

        return database.ref(`users/${uid}/preferences/userCategories`).push(category).then((ref) => {
            dispatch(addCategory({
                id: ref.key,
                ...category
            }));
            console.log(ref.key)
        }).catch((e) => {
            console.log(e);
        });
    };  
};