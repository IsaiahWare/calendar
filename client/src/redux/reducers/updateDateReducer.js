export default (state = {monthCounter: 0, date: new Date()}, action) => {
    switch (action.type) {
        case 'inc':
            let currentDate = new Date();
            let updatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (state.monthCounter+1), 1);
            return {
                monthCounter: state.monthCounter + 1,
                date: updatedDate
            };
        case 'dec':
            let currentDate2 = new Date();
            let updatedDate2 = new Date(currentDate2.getFullYear(), currentDate2.getMonth() + (state.monthCounter-1), 1);
            return {
                monthCounter: state.monthCounter - 1,
                date: updatedDate2
            };
        default:
            return state;
    }
}