export const updateWeeksAction = (weeks) => dispatch => {
    dispatch({
        type: 'updateWeeks',
        payload: weeks
    })
}