import {UserProps} from '../../Auth/types'
import {StatusProps} from '../../../types/status'

export interface ProfileProps extends StatusProps{
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
      
    }
  
}