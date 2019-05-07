export default (state = {currentMonth: 0}, action) => {
    switch (action.type) {
        case 'cm':
            return {
                currentMonth: action.payload
            };

        default:
            return state
    }
}