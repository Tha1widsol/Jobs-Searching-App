export interface UserProps{
    id: number | null
    email: string | null
    isHired: boolean | null
    isAnEmployer: boolean | null
}

export interface AuthProps {
    values: UserProps
    isLoggedIn: boolean | null
    status: 'success' | 'loading' | 'rejected' | ''
}