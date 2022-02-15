export interface FieldProps{
    value : string
    isValid: boolean
    errorMsg: string
}

export interface TextFieldProps extends FieldProps{
    currentLength: number 
    maxLength: number
}

export interface FileProps{
    value: string | Blob
    name: string
}