import {UserProps} from '../../Auth/types'

export interface EmployerProps {
    values: {
        user: UserProps
        firstName: string
        middleName?: string
        lastName: string
        about?: string
        logo?: string
        status: null | string
    }
}