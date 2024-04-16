import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export interface UserSuccessfulResponse {
    success: boolean,
    token: string, 
    mercure_token:string,
    email:string,
    username: string,
    creation_date: Creation_Date,
    role: Array<String>,
    image: string, 
    id: number
}

export interface Creation_Date{
    date: string,
    timezone_type: number,
    timezone: string
}

export interface UserUnsuccessfullResponse {
    code: number, 
    message: string
}