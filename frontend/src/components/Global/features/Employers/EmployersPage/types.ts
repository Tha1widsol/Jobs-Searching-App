export interface EmployerProps {
    values: {
        user: {email: string, isHired: boolean | null, isAnEmployer: boolean | null}
        firstName: string
        middleName?: string
        lastName: string
        about?: string
        logo?: string
        status: null | string
    }
}