export interface PasswordProps{
    value: string
    hasValidLength: boolean | null
    hasUppercase: boolean | null
    hasDigit: boolean | null
    hasSymbol: boolean | null
}
