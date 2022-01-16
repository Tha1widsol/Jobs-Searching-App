export interface FormProps{
    firstName: {isValid: boolean, msg: string}
    middleName: {isValid: boolean, msg: string}
    lastName:  {isValid: boolean, msg: string}
    about:  {isValid: boolean, msg: string}

    skill: {isEmpty: boolean,
        EmptyMsg: string, 
        alreadyExists:boolean, 
        alreadyExistsMsg:string}
}
