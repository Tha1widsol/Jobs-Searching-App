export interface FieldProps{
    value: string
    isValid: boolean
    errorMsg: string
}

export interface EmailProps{
    value: string
    isValid: boolean
    invalidErrorMsg: string
    alreadyExistsErrorMsg: string
}

export interface PasswordProps{
    value: string
    hasValidLength: boolean | null
    hasUppercase: boolean | null
    hasDigit: boolean | null
    hasSymbol: boolean | null
}
