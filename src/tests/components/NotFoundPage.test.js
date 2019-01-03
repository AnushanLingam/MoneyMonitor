import React from 'react';
import NotFoundPage from '../../components/NotFoundPage';
import {shallow} from 'enzyme';

test("Should correctly render NotFoundPage", () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).toMatchSnapshot();

});
