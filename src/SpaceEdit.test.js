import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SpaceEdit } from './SpaceEdit';

describe('SpaceEdit', () => {
    let mockSave;
    let spaceEdit;

    beforeEach(() => {
        mockSave = jest.fn();
        spaceEdit = shallow(<SpaceEdit saveSpace={mockSave} currentSpace={{ name: 'Test Space', memory: 20, disk: 40 }} />);
    });

    it('should exist and have text fields that are populated', () => {
        expect(spaceEdit.find('#spaceEdit')).to.have.length(1);
        expect(spaceEdit.find('#name')).to.have.length(1);
        expect(spaceEdit.find('#memory')).to.have.length(1);
        expect(spaceEdit.find('#disk')).to.have.length(1);
        expect(spaceEdit.find('#save')).to.have.length(1);

        expect(spaceEdit.find('#name').props().value).to.equal('Test Space');
        expect(spaceEdit.find('#memory').props().value).to.equal(20);
        expect(spaceEdit.find('#disk').props().value).to.equal(40);
    });

    it('calls saveSpace when save button is clicked', () => {
        const saveSpaceButton = spaceEdit.find('button').find('#save');

        saveSpaceButton.simulate('click');

        expect(mockSave.mock.calls.length).to.equal(1);
    });

    it('should update values when text is entered', () => {
        let name = spaceEdit.find('#name');
        let memory = spaceEdit.find('#memory');
        let disk = spaceEdit.find('#disk');

        expect(name.props().value).to.equal('Test Space');
        expect(memory.props().value).to.equal(20);
        expect(disk.props().value).to.equal(40);

        name.simulate('change', { target: { value: 'New Test Space' } });
        memory.simulate('change', { target: { value: 30 } });
        disk.simulate('change', { target: { value: 50 } });

        name = spaceEdit.find('#name');
        memory = spaceEdit.find('#memory');
        disk = spaceEdit.find('#disk');

        expect(name.props().value).to.equal('New Test Space');
        expect(memory.props().value).to.equal(30);
        expect(disk.props().value).to.equal(50);
    });
});