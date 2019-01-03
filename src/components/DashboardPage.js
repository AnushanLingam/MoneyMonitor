import React from 'react';

import ManageExpenses from './ManageExpenses';
import Expenses from './Expenses';

class DashboardPage extends React.Component {
    render() {
        return(
            <div className="content-container">
                <ManageExpenses />
                <Expenses />
            </div>
        );
    }
}
export default DashboardPage;