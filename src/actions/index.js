export const editSpace = (space) => ({ type: 'EDIT_SPACE', space });

export const saveSpace = (space) => (postSpace(space));

export const getSpaces = () => ({ type: 'GET_SPACES' });

export const gotSpaces = (spaces) => ({ type: 'GOT_SPACES', spaces });

export const postSpace = (space) => {
    return async (dispatch) => {
        await fetch('/spaces',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(space)
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                dispatch({ type: 'SAVE_SPACE', space: myJson });
            });
    }
}

export const fetchSpaces = () => {
    return async (dispatch) => {
        dispatch(getSpaces());

        await fetch('/spaces')
            .then(function (response) {
                return response.json();
            }).then(function (myJson) {
                dispatch(gotSpaces(myJson));
            });
    }
}