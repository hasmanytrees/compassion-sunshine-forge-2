import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { App } from './App';

describe('App', () => {

    const shallowWithDefaults = (overrides) => {
        const props = {
            fetchSpaces: () => { },
            editSpace: () => { },
            ...overrides
        }

        return shallow(<App {...props} />);
    }

    it('should have an add space button', () => {
        const app = shallowWithDefaults();
        const addSpaceButton = app.find('button').find('#addSpace');

        expect(addSpaceButton).to.have.length(1);
    });

    it('should call editSpace when add space button is clicked', () => {
        const mockEditSpace = jest.fn();
        const app = shallowWithDefaults({ editSpace: mockEditSpace });

        const addSpaceButton = app.find('button').find('#addSpace');

        addSpaceButton.simulate('click');

        expect(mockEditSpace.mock.calls.length).to.equal(1);
    });

    it('should call the getSpaces action on mount', () => {
        const mockGetSpaces = jest.fn();
        const app = shallowWithDefaults({ fetchSpaces: mockGetSpaces });

        expect(mockGetSpaces.mock.calls.length).to.equal(1);
    });
});