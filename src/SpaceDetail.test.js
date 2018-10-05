import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SpaceDetail } from './SpaceDetail';

describe('SpaceDetail', () => {
    let detail;
    let name;
    let memory;
    let disk;

    const shallowWithDefaults = (overrides) => {
        const props = {
            currentSpace: { name: 'Test Space', memory_quotamb: 20, disk_quotamb: 40 },
            editSpace: () => { },
            deleteSpace: () => { },
            ...overrides
        }

        return shallow(<SpaceDetail {...props} />);
    };

    it('should render and bind data', () => {
        const spaceDetail = shallowWithDefaults();
        name = spaceDetail.find('#name');
        memory = spaceDetail.find('#memory');
        disk = spaceDetail.find('#disk');

        expect(spaceDetail.find('#spaceDetail')).to.have.length(1);

        expect(name.text()).to.equal('Test Space');
        expect(memory.text()).to.equal('20');
        expect(disk.text()).to.equal('40');
    });

    it('displays an edit button that allows you to edit details when pressed', () => {
        const mockEdit = jest.fn();
        const spaceDetail = shallowWithDefaults({ editSpace: mockEdit })
        const editButton = spaceDetail.find('#editButton');

        // Checks for the button
        expect(editButton).to.have.length(1);

        // When clicking the button, it goes to edit screen.
        editButton.simulate('click');
        expect(mockEdit.mock.calls.length).to.equal(1);
    });

    it('displays a delete button that allows you to delete the space when pressed', () => {
        const mockDelete = jest.fn();
        const spaceDetail = shallowWithDefaults({ deleteSpace: mockDelete });
        const deleteButton = spaceDetail.find('#deleteButton');

        expect(deleteButton).to.have.length(1);

        deleteButton.simulate('click');
        expect(mockDelete.mock.calls.length).to.equal(1);
    });
});