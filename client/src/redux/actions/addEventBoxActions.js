export const openAddEventBoxAction = (id) => dispatch => {
    dispatch({
        type: 'open',
        payload: id
    })
}

export const closeAddEventBoxAction = (id) => dispatch => {
    dispatch({
        type: 'close',
        payload: id
    })
}