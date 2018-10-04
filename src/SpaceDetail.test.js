import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SpaceDetail } from './SpaceDetail';

describe('SpaceDetail', () => {
    it('should render and bind data', () => {
        const detail = shallow(<SpaceDetail currentSpace={{ name: 'Test Space', memory_quotamb: 20, disk_quotamb: 40 }} />);

        expect(detail.find('#spaceDetail')).to.have.length(1);

        const name = detail.find('#name');
        const memory = detail.find('#memory');
        const disk = detail.find('#disk');

        expect(name.text()).to.equal('Test Space');
        expect(memory.text()).to.equal('20');
        expect(disk.text()).to.equal('40');
    });
});