export default (state = {monthCounter: 0}, action) => {
    switch (action.type) {
        case 'incMonth':
            return {
                monthCounter: state.monthCounter + 1
            };

        case 'decMonth':
        return {
            monthCounter: state.monthCounter - 1
        };

        default:
            return state;
    }
}