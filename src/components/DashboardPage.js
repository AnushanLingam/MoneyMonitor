import React from 'react';

import ManageExpenses from './ManageExpenses';


class DashboardPage extends React.Component {
    render() {
        return(
            <div className="content-container">
                <ManageExpenses />
            </div>
        );
    }
}
export default DashboardPage;