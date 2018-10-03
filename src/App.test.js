import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { App } from './App';

describe('App', () => {
    it('should have an add space button', () => {
        const app = shallow(<App />);

        const addSpaceButton = app.find('button').find('#addSpace');

        expect(addSpaceButton).to.have.length(1);
    });

    it('should call editSpace when add space button is clicked', () => {
        const mockChangeView = jest.fn();

        const app = shallow(<App editSpace={mockChangeView} />);
        const addSpaceButton = app.find('button').find('#addSpace');

        addSpaceButton.simulate('click');

        expect(mockChangeView.mock.calls.length).to.equal(1);
    });
});