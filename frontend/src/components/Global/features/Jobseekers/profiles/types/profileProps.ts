import { StatusProps } from "../../../../types/status"
import { UserProps } from "../../../Auth/user"

export interface ProfileProps extends StatusProps{
    values: {
        id: number
        user: UserProps
        firstName: string
        lastName: string
        middleName?: string
        skills: [{id: 0, name: string, specific: boolean}]
        phone: string
        logo?: string
        cv: string
        education: string
        industry: string
        distance: string
        experience?: string
        about: string
        isActive: boolean
    }
  
}
