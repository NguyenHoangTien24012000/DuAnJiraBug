const initialState = {
    visible : false,
    componentContentDrawer : <p>alo cac ban tre</p>,
    title : '',
    callBackSubmit : () =>{alert("chan cac ban that day!!!")}
}

export default (state = initialState, action) => {
    switch (action.type) {

    case "OPEN_DRAWER": 
        return { ...state, visible:true}
    case "CLOSE_DRAWER" :
        return {...state, visible:false}
    case "OPEN_FORM_EDIT_PROJECT":
        return {...state, visible:true, componentContentDrawer : action.Component,title : action.title}
        case 'SET_SUBMIT_PROJECT':
            return {...state, callBackSubmit : action.submitFunction}

            case 'SET_SUBMIT_CREATE_TASK' :
                return {...state, callBackSubmit : action.submitFunction}
    default:
        return state
    }
}

