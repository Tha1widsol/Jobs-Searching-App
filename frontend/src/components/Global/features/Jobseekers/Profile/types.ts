import {UserProps} from '../../Auth/types'

export interface ProfileProps{
    values: {
        user: UserProps
        firstName: string
        lastName: string
        middleName?: string
        skills: {name: string}[]
        phone: string
        logo?: string
        cv: string
        education: string
        industry: string
        distance: string
        experience?: string
        about: string
        isActive: boolean | null
        status: string
    }
  
}