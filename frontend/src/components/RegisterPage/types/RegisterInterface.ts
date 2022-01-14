export interface FormProps{
    emailIsValid: boolean,
    password: {
        hasValidLength: boolean | null,
        hasUppercase: boolean | null,
        hasDigit: boolean | null,
        hasSymbol: boolean | null
    },

    confirmPasswordIsValid: boolean
}
