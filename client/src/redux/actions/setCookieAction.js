export const setCookieAction = (cookie) => dispatch => {
    dispatch({
        type: 'setCookie',
        payload: cookie
    })
}