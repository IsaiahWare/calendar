export default (state = {open: false, id: ""}, action) => {
    switch (action.type) {
        case 'open':
            return {
                open: true,
                id: action.payload
            }

        case 'close':
            return {
                open: false,
                id: action.payload
            }

        default:
            return state
    }
}