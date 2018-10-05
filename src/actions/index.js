export const editSpace = (space) => ({ type: 'EDIT_SPACE', space });

export const saveSpace = (space) => (doSaveSpace(space));

export const getSpaces = () => (doGetSpaces());

export const viewSpace = (space) => ({ type: 'VIEW_SPACE', space });

export const deleteSpace = (space) => (doDeleteSpace(space));

export const doSaveSpace = (space) => {
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

export const doGetSpaces = () => {
    return async (dispatch) => {
        dispatch({ type: 'GET_SPACES' });

        await fetch('/spaces')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                dispatch({ type: 'GOT_SPACES', spaces: myJson });
            });
    }
}

export const doDeleteSpace = (space) => {
    return async (dispatch) => {
        await fetch('/spaces',
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(space)
            })
            .then(function (response) {
                dispatch({ type: 'DELETE_SPACE', space });
            });
    }
}

export const editApp = (app) => ({ type: 'EDIT_APP', app });