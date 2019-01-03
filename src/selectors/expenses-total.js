
export default (expenses) => {

    if(expenses.length === 0) {
        return 0;
    }

    const amounts = expenses.map((expense) => expense.amount);
    return amounts.reduce((accumulator, currentValue) => accumulator + currentValue);
}