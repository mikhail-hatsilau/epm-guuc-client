import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Auth from '../src/components/Auth';

jest.mock('../src/api', () => (
    {
        fetchUser: jest.fn((id) => Promise.resolve({ user: { username: 'test' } }))
    }
));

describe('Auth', () => {
    let component;

    beforeEach(() => {
        component = renderer.create(<Auth />);
    });

    it('should be rendered', () => {
        const wrapper = shallow(<Auth />);
        expect(wrapper.find('.authComponent')).toBeTruthy();
    });

    it('renders correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should handle password validation', () => {
        const instance = component.getInstance();

        expect(component.toJSON()).toMatchSnapshot();

        instance.handlePasswordChange({
            target: {
                value: '1234'
            }
        });

        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should call onLoggedIn callback when form is submitted', () => {
        const onLoggedIn = jest.fn();
        component = shallow(<Auth onLoggedIn={ onLoggedIn }/>);

        component.setState({
            invalidUsername: false,
            invalidPassword: false
        });

        component.find('button').simulate('click');

        expect(onLoggedIn).toBeCalled();
    });

    it('should fetch user data', () => {
        const apiModule = require('../src/api');
        apiModule.fetchUser.mockClear();
        component = renderer.create(<Auth />);

        expect(apiModule.fetchUser.mock.calls).toHaveLength(1);
        expect(apiModule.fetchUser).toHaveBeenCalledWith(1);
    });
});