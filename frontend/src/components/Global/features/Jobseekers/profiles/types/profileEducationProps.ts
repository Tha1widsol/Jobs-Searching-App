export interface ProfileEducationProps{
        id: number
        education: string,
        field: string,
        institution: string,
        country: string,
        city: string,
        currentlyEnrolled: boolean,
        fromDate: string,
        toDate: string
}


export interface ProfileEducationListProps{
    status: 'success' | 'loading' | 'rejected' | ''
    values: [{
        id: number
        education: string,
        field: string,
        institution: string,
        country: string,
        city: string,
        currentlyEnrolled: boolean,
        fromDate: string,
        toDate: string
    }]
}
