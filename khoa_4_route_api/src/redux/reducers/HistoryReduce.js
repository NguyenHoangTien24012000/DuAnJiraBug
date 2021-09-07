const initialState = {
    history : {}
}

export default (state = initialState,  action ) => {
    switch (action.type) {

        case 'ADD_HISTORY':{
            state.history = action.history;
            // console.log('state',state.history)
            return {...state}
        }

    default:
        return state
    }
}
