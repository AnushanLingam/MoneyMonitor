import React from 'react';
import DashboardPage from '../../components/DashboardPage';
import {shallow} from 'enzyme';

test("Should correctly render DashboardPage", () => {
    const wrapper = shallow(<DashboardPage />);

    expect(wrapper).toMatchSnapshot();

});
