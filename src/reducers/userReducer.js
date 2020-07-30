const initial = {username : '', name : '', token : ''}

const userReducer = (state = initial, action) => {
    switch (action.type){
        case "LOGGINGIN":
            return action.data
        default :
            return state
    }
}

export const login = (username, name, token) => {
    return {
        type : "LOGGINGIN",
        data : {username,name,token}
    }
}

export default userReducer
