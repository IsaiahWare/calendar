export default (state = {id: null, cookie: null}, action) => {
    switch (action.type) {
        case 'set':
            return {
                id: action.payload.id,
                cookie: action.payload.cookie
            }

        case 'get':
            return state

        default:
            return state
    }
}