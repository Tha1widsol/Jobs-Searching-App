import {UserProps} from "../../Auth/types";
import {StatusProps} from "../../../types/status";

export interface CompanyProps extends StatusProps{
    values: {
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
}

export interface CompaniesProps extends StatusProps{
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