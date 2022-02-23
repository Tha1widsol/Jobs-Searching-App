import {UserProps} from "../../Auth/types";

export interface CompaniesProps{
    status: string
    values: [{
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
    }]
  
}