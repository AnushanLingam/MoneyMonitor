import database from '../firebase/firebase';
import numeral from 'numeral';
require('numeral/locales/en-gb');
require('numeral/locales/fr');

import { startEditExpense, startSetExpenses } from './budget'

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
        }).catch((e) => {
            console.log(e);
        });
    };  
};

export const editCategory = (id, updates) => ({
    type: "EDIT_CATEGORY",
    id,
    updates
})

export const startEditCategory = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/preferences/userCategories/${id}`).update({
            ...updates
        }).then( () => {
            dispatch(editCategory(id, updates));
        }).catch( (e) => {
            console.log(e);
        });
    }
}

export const removeCategory = (id) => ({
    type: "REMOVE_CATEGORY",
    id
});

export const startRemoveCategory = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = getState().expenses;
        
        const newExpenses = expenses.filter((expense) => expense.category === id);
        const aysncStartEdit = async (expenseId, updates) => {
            return await dispatch(startEditExpense(expenseId, updates));
        } 

        const updateAll = async (expenseObjects) => {
            return await Promise.all(expenseObjects.map((expense) => {
                aysncStartEdit(expense.id, {category: ""});
            }))
        };

        updateAll(newExpenses).then(() => {
            return database.ref(`users/${uid}/preferences/userCategories/${id}`).remove().then( () => {
                return dispatch(removeCategory(id));
            }).then(() => {
                dispatch(startSetExpenses());
            }).catch( (e) => {
                console.log(e);
            }); 
        });
    }
}