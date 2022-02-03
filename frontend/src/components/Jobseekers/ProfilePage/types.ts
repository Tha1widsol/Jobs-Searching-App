export interface ProfileProps{
    user: {email: string, isHired: boolean | null, isAnEmployer: boolean | null}
    firstName: string
    lastName: string
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