import { StatusProps } from "../../../../components/Global/types/status"
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
        industry: string
        distance: string
        about: string
        isActive: boolean
    }
  
}
