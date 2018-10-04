import uuid from 'uuid';

const initialState = {
    view: '',
    spaces: [],
    currentSpace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_SPACE':
            return { ...state, view: 'SpaceEdit', currentSpace: action.space };
        case 'SAVE_SPACE':
            if (!action.space.id) {
                action.space.id = uuid();
                const spaces = [...state.spaces, action.space];
                return { ...state, spaces, view: 'SpaceDetail', currentSpace: action.space };
            }
            else {
                const spaces = state.spaces.filter((space) => space.id !== action.space.id);
                spaces.push(action.space);
                return { ...state, spaces, view: 'SpaceDetail', currentSpace: action.space };
            }
        default:
            return state;
    }
};

export default reducer;