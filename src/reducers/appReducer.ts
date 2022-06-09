export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStateType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error:null as ErrorStateType
}

export type InitialStateType = typeof initialState

export type ActionsAppType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error:action.payload.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status:RequestStatusType)=>{
    return {
        type:'APP/SET-STATUS',
        payload:{status}
    }as const
}

export const setAppErrorAC = (error:ErrorStateType)=>{
    return{
        type:'APP/SET-ERROR',
        payload:{error}
    }as const
}



