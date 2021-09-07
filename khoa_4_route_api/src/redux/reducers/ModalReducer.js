const initialState = {
    Component : <p>Noi dung mac dinh</p>
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_FORM' : {
            state.Component =action.Component
            return {...state}
        }
  

    default:
        return state
    }
}
