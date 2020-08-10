const initial = {username : '', name : '', token : ''}

const userReducer = (state = initial, action) => {
    switch (action.type){
        case "LOGGINGIN":
            return action.data
        default :
            return state
    }
}

export const login = (token) => {
    return {
        type : "LOGGINGIN",
        data : {token}
    }
}

export default userReducer
