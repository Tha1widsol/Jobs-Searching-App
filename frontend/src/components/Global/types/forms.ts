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

export interface ListProps{
    value: Array<string>
    currentVal: string
    isEmpty: boolean
    emptyErrorMsg: string
    alreadyExists: boolean
    alreadyExistsMsg: string
    AddedMsg: string
    RemovedMsg: string
}

