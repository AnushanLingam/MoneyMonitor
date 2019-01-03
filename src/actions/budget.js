import database from '../firebase/firebase';


export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {    
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once("value").then( (snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log(expenses);
            dispatch(setExpenses(expenses));
    
        }).catch( (e) => {
            console.log(e);
        });
    };
};

export const addExpense = (expense) => ({
        type: "ADD_EXPENSE",
        expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const {
            title = "", 
            note = "", 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const uid = getState().auth.uid;

        const expense = {title, note, amount, createdAt};

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        }).catch((e) => {
            console.log(e);
        });
    };  
};

export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then( () => {
            dispatch(removeExpense({id}));
        }).catch( (e) => {
            console.log(e);
        });
    };
};

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update({
            ...updates
        }).then( () => {
            dispatch(editExpense(id, updates));
        }).catch( (e) => {
            console.log(e);
        });
    };
};