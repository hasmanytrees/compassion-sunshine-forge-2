import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AppList } from './AppList';

describe('AppList', () => {
    it('displays an addApp button', () => {
        const addAppButton = shallow(<AppList />).find('#addApp');

        expect(addAppButton).to.have.length(1);
    });

    it('clicking the Add App button calls for Add App screen once', () => {
        const mockAddApp = jest.fn();
        const spaceDetail = shallow(<AppList editApp={mockAddApp} />);
        const addAppButton = spaceDetail.find('#addApp');

        expect(addAppButton).to.have.length(1);

        addAppButton.simulate('click');
        expect(mockAddApp.mock.calls.length).to.equal(1);
    });
});