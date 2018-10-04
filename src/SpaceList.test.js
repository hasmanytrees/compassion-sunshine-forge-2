import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SpaceList } from './SpaceList';

describe('SpaceList', () => {

    it('should display a list of spaces', () => {
        const spaceNames = [{ name: 'Test 1' }, { name: 'Test 2' }]
        const names = shallow(<SpaceList spaces={spaceNames} />);

        expect(names.find('#spaceList')).to.have.length(1);
        expect(names.find('li')).to.have.length(2);
        expect(names.find('li').first().find('a').text()).to.equal('Test 1');
        expect(names.find('li').last().find('a').text()).to.equal('Test 2');
    });

});