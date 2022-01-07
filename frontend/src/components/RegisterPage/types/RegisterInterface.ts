export interface FormErrors{
    emailError: boolean,
    passwordError: {
        invalidLength: boolean | null,
        noUppercase: boolean | null,
        noDigit: boolean | null,
        noSymbol: boolean | null
    },

    confirmPasswordError: boolean
}
