import database from '../firebase/firebase';

export const setSavings = (savings) => ({
    type: 'SET_SAVINGS',
    savings
});

export const startSetSavings = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/savings`).once("value").then((snapshot) => {
            const savings = [];
            snapshot.forEach((childSnapshot) => {
                savings.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setSavings(savings));

        }).catch((e) => {
            console.log(e);
        });
    };
};

export const addSaving = (saving) => ({
    type: "ADD_SAVING",
    saving
});

export const startAddSaving = (savingData = {}) => {
    return (dispatch, getState) => {
        const {
            title = "",
            goal = 0,
            amount = 0,
        } = savingData;
        const uid = getState().auth.uid;

        const saving = { title, goal, amount };
        return database.ref(`users/${uid}/savings`).push(saving).then((ref) => {
            dispatch(addSaving({
                id: ref.key,
                ...saving
            }))
        }).catch((e) => {
            console.log(e);
        });
    };
};


export const removeSaving = ({ id } = {}) => ({
    type: "REMOVE_SAVING",
    id
});

export const startRemoveSaving = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/savings/${id}`).remove().then(() => {
            dispatch(removeSaving({ id }));
        }).catch((e) => {
            console.log(e);
        });
    };
};

export const editSaving = (id, updates) => ({
    type: "EDIT_SAVING",
    id,
    updates
});

export const startEditSaving = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/savings/${id}`).update({
            ...updates
        }).then(() => {
            dispatch(editSaving(id, updates));
        }).catch((e) => {
            console.log(e);
        });
    };
};

export const startRemoveAllSavings = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/savings`).remove().then( () => {
            dispatch(setSavings([]));
        }).catch( (e) => {
            console.log(e);
        });
    };
};