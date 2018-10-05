import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AppEdit } from './AppEdit';

describe('AppEdit', () => {
    it('renders without crashing', () => {
        const appEdit = shallow(<AppEdit />);

        expect(appEdit.find('#appEdit')).to.have.length(1);
    });
});