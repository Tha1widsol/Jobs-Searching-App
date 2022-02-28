import {UserProps} from "../../Global/features/Auth/types";

export interface CompanyProps{
    user: UserProps
    id: number | null
    name: string
    email: string
    about: string
    phone: string
    logo?: string
    banner?: string 
    industry: string
    website?: string
}