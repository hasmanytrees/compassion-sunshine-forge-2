import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should send SAVE_SPACE action with a space that has been saved', async () => {
        // setup fetch mock
        const mockSpace = { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 };
        fetchMock.post('/spaces', mockSpace);

        // setup expected actions
        const expectedActions = [
            { type: 'SAVE_SPACE', space: mockSpace }
        ];

        // setup mock store with empty initial state/store
        const store = mockStore({});

        // execute async action (triggering fetch mock)
        await store.dispatch(actions.saveSpace(mockSpace))

        // assert actions were sent to mock store
        const actualActions = store.getActions();

        expect(actualActions).toEqual(expectedActions);
    });

    it('should send GET_SPACES and GOT_SPACES actions to load all space from db/api', async () => {
        const mockSpaces = [
            { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 },
            { id: '22345678901234567890123456', name: 'Mock Space 2', memory_quotamb: 22, disk_quotamb: 42 }
        ];

        fetchMock.get('/spaces', mockSpaces);

        const expectedActions = [
            { type: 'GET_SPACES' },
            { type: 'GOT_SPACES', spaces: mockSpaces }
        ]

        const store = mockStore({});

        await store.dispatch(actions.getSpaces());

        const actualActions = store.getActions();

        expect(actualActions).toEqual(expectedActions);
    });

    it('should send DELETE_SPACE action to delete space from db/api', async () => {
        const mockSpaces = [
            { id: '12345678901234567890123456', name: 'Mock Space 1', memory_quotamb: 20, disk_quotamb: 40 },
            { id: '22345678901234567890123456', name: 'Mock Space 2', memory_quotamb: 22, disk_quotamb: 42 }
        ];

        fetchMock.delete('/spaces', {});

        const expectedActions = [
            { type: 'DELETE_SPACE', space: mockSpaces[0] }
        ]

        const store = mockStore({});

        await store.dispatch(actions.deleteSpace(mockSpaces[0]));

        const actualActions = store.getActions();

        expect(actualActions).toEqual(expectedActions);
    });

    it('should send EDIT_APP action to create/edit an app', async () => {
        const mockApp = { name: 'Mock App' };

        const expectedActions = [
            { type: 'EDIT_APP', app: mockApp }
        ];

        const store = mockStore({});

        await store.dispatch(actions.editApp(mockApp));

        const actualActions = store.getActions();

        expect(actualActions).toEqual(expectedActions);
    });
});