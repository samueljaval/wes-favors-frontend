const initial = {username : '', name : '', token : ''}

const userReducer = (state = initial, action) => {
    switch (action.type){
        case "LOGGINGIN":
            return action.data
        // case "LOGGINGOUT":
        //     return null
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

// export const logout = (token) => {
//     return {
//         type : "LOGGINGOUT"
//     }
// }

export default userReducer
