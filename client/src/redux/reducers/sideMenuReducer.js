export default (state = {sideMenu: 0}, action) => {
    switch (action.type) {
        case 'toggleSideMenu':
            return {sideMenu: state.sideMenu + 1}
        default:
            return state;
    }
}