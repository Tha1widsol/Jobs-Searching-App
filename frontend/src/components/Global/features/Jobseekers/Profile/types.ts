export interface ProfileProps{
    values: {
        user: {email: string, isHired: boolean | null, isAnEmployer: boolean | null}
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
        status: null | string
    }
  
}