import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SpaceEdit } from './SpaceEdit';

describe('SpaceEdit', () => {
    xit('should exist and have text fields', () => {
        const spaceEdit = shallow(<SpaceEdit />);

        expect(spaceEdit.find('#spaceEdit')).to.have.length(1);
        expect(spaceEdit.find('#name')).to.have.length(1);
        expect(spaceEdit.find('#memory')).to.have.length(1);
        expect(spaceEdit.find('#disk')).to.have.length(1);
        expect(spaceEdit.find('#save')).to.have.length(1);
    });

    it('renders entered text on screen when \"Save\" button is clicked', () => {
        const mockSave = jest.fn();
        const spaceEdit = shallow(<SpaceEdit saveSpace={mockSave} currentSpace={{}} />);

        const saveSpaceButton = spaceEdit.find('button').find('#save');

        saveSpaceButton.simulate('click');

        expect(mockSave.mock.calls.length).to.equal(1);
    });
});