import React from 'react';
import {shallow} from 'enzyme';
import {Login} from '../../components/Login';

test("Should render login page correctly", () => {
    const wrapper = shallow(<Login startLogin={() => {}}/>);

    expect(wrapper).toMatchSnapshot();
});

test("Should call startLogin on button click", () => {
    const login = jest.fn();
    const wrapper = shallow(<Login startLogin={login}/>);
    wrapper.find("button").simulate("click");
    expect(login).toHaveBeenCalled();
});