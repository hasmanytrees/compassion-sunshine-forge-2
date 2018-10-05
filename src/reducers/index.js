import uuid from 'uuid';

const initialState = {
    view: '',
    spaces: [],
    currentSpace: null,
    currentApp: null
};

const reducer = (state = initialState, action) => {
    let spaces;

    switch (action.type) {
        case 'EDIT_SPACE':
            return { ...state, view: 'SpaceEdit', currentSpace: action.space };
        case 'SAVE_SPACE':
            if (!action.space.id) {
                action.space.id = uuid();
                spaces = [...state.spaces, action.space];
                return { ...state, spaces, view: 'SpaceDetail', currentSpace: action.space };
            }
            else {
                spaces = state.spaces.filter((space) => space.id !== action.space.id);
                spaces.push(action.space);
                return { ...state, spaces, view: 'SpaceDetail', currentSpace: action.space };
            }
        case 'GET_SPACES':
            return { ...state, loading: true }
        case 'GOT_SPACES':
            spaces = [...action.spaces];
            return { ...state, spaces, loading: false };
        case 'VIEW_SPACE':
            return { ...state, view: 'SpaceDetail', currentSpace: action.space };
        case 'DELETE_SPACE':
            spaces = state.spaces.filter((space) => space.id !== action.space.id);
            return { ...state, view: '', spaces, currentSpace: null };
        case 'EDIT_APP':
            return { ...state, view: 'AppEdit', currentApp: action.app };
        default:
            return state;
    }
};

export default reducer;