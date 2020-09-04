
// initial state values in store
export const initalState = {
    currentlyDragComponent : ''
}

// reducers - to call the action
const reducer = (state = initalState, action) => {
    let newState = {...state}
    if(action.type === 'UPDATE_DRAGGED_COMPONENT') {
        newState.currentlyDragComponent = action.elementType;
    }

    return newState;
}
export default reducer;

