import React from 'react';
import {Header} from '../../components/Header';
import {shallow} from 'enzyme';


test("Should correctly render Header", () => {

    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test("Should call startLogout on button click", () => {
    const logout = jest.fn();
    const wrapper = shallow(<Header startLogout={logout}/>);
    wrapper.find("button").simulate("click");
    expect(logout).toHaveBeenCalled();
});
