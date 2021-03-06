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

    it('should update spaces from GOT_SPACES', () => {
        const state = {
            view: 'SpaceList',
            spaces: [],
            currentSpace: null,
            loading: true
        };

        const mockSpaces = [
            { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 },
            { id: '22345678901234567890123456', name: 'Mock Space 2', memory_quotamb: 22, disk_quotamb: 42 }
        ];

        const action = { type: 'GOT_SPACES', spaces: mockSpaces }

        const newState = reducer(state, action);

        expect(newState.spaces.length).to.equal(mockSpaces.length);
        expect(newState.loading).to.equal(false);
    });

    it('should set loading to true for GET_SPACES', () => {
        const state = {
            view: 'SpaceList',
            spaces: [],
            currentSpace: null,
            loading: false
        };

        const action = { type: 'GET_SPACES' }

        const newState = reducer(state, action);

        expect(newState.loading).to.equal(true);
    });

    it('should view space for VIEW_SPACE', () => {
        const mockSpaces = [
            { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 },
            { id: '22345678901234567890123456', name: 'Mock Space 2', memory_quotamb: 22, disk_quotamb: 42 }
        ];

        const state = {
            view: 'SpaceList',
            spaces: mockSpaces,
            currentSpace: null,
            loading: false
        };

        const action = { type: 'VIEW_SPACE', space: mockSpaces[0] }

        const newState = reducer(state, action);

        expect(newState.currentSpace).to.deep.equal(mockSpaces[0]);
        expect(newState.view).to.equal('SpaceDetail');
    });

    it('should delete space for DELETE_SPACE', () => {
        const mockSpaces = [
            { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 },
            { id: '22345678901234567890123456', name: 'Mock Space 2', memory_quotamb: 22, disk_quotamb: 42 }
        ];

        const state = {
            view: 'SpaceList',
            spaces: mockSpaces,
            currentSpace: mockSpaces[0],
            loading: false
        };

        const action = { type: 'DELETE_SPACE', space: mockSpaces[0] }

        const newState = reducer(state, action);

        expect(newState.currentSpace).to.equal(null);
        expect(newState.view).to.equal('');
        expect(newState.spaces.length).to.equal(mockSpaces.length - 1);
    });

    it('should change to Edit App view for EDIT_APP', () => {
        // setup space object to be edited
        const testApp = { name: 'Space App', memory: 20, disk: 40 };

        // setup an test state
        const testState = {
            view: 'SpaceDetails',
            currentApp: null
        };

        // setup the action
        const action = { type: 'EDIT_APP', app: testApp };

        // execute reduce
        const newState = reducer(testState, action);

        // assert expected changes to state
        expect(newState.view).to.equal('AppEdit');
        expect(newState.currentApp).to.deep.equal(testApp);
    });
});