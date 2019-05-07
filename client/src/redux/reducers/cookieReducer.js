export default (state = {cookie: ""}, action) => {
    switch (action.type) {
        case 'setCookie':
            return {
                cookie: action.payload
            }

        case 'getCookie':
            return [...state.cookie];

        default:
            return state
    }
}