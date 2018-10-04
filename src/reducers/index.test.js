import reducer from './index';
import { expect } from 'chai';

describe('reducer', () => {
    it('edit space', () => {
        // setup space object to be edited
        const testSpace = { name: 'Test Space 1', memory: 20, disk: 40 };

        // setup an test state
        const testState = {
            view: 'SpaceList',
            spaces: [testSpace],
            currentSpace: null
        };

        // setup the action
        const action = { type: 'EDIT_SPACE', space: testSpace };

        // execute reduce
        const newState = reducer(testState, action);

        // assert expected changes to state
        expect(newState.view).to.equal('SpaceEdit');
        expect(newState.spaces).to.deep.equal(testState.spaces);
        expect(newState.currentSpace).to.deep.equal(testSpace);
    });

    it('save space can save a new space', () => {
        const testSpace = { name: 'Test Space 1', memory: 20, disk: 40 };
        const action = { type: 'SAVE_SPACE', space: testSpace };
        const testState = {
            view: 'SpaceList',
            spaces: [],
            currentSpace: null
        };

        const newState = reducer(testState, action);

        expect(newState.view).to.equal('SpaceDetail');
        expect(newState.spaces.length).to.equal(testState.spaces.length + 1);
        expect(newState.currentSpace.name).to.equal(testSpace.name);
        expect(newState.currentSpace.memory).to.equal(testSpace.memory);
        expect(newState.currentSpace.disk).to.equal(testSpace.disk);
        expect(newState.currentSpace.id).to.have.length(36);
    });

    it('should update space', () => {
        const testSpace = { id: '123456789012345678901234567890123456', name: 'Test Space 2', memory: 20, disk: 40 };

        const state = {
            view: 'SpaceEdit',
            spaces: [testSpace],
            currentSpace: testSpace
        };

        testSpace.memory = 30;
        testSpace.disk = 50;

        const action = { type: 'SAVE_SPACE', space: testSpace };

        const newState = reducer(state, action);

        expect(newState.currentSpace.name).to.equal('Test Space 2');
        expect(newState.currentSpace.memory).to.equal(30);
        expect(newState.currentSpace.disk).to.equal(50);
        expect(newState.spaces.length).to.equal(state.spaces.length);
        expect(newState.view).to.equal('SpaceDetail');
    });
});