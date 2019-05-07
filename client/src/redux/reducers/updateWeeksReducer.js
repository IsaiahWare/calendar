export default (state = {weeks: null}, action) => {
    switch (action.type) {
        case 'updateWeeks':
            return action.payload;
        default:
            return state;
    }
}