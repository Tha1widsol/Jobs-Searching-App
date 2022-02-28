import {StatusProps} from "../../types/status";

export interface UserProps{
    id: number | null
    email: string | null
    isHired: boolean | null
    isAnEmployer: boolean | null
}

export interface AuthProps extends StatusProps {
    values: UserProps
    isLoggedIn: boolean | null
}