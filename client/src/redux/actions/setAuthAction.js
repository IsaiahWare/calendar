export const setAuthAction = (obj) => dispatch => {
    dispatch({
        type: 'set',
        payload: obj
    })
}