import {FieldProps} from "../../../Global/types/forms";

export interface TextFieldProps extends FieldProps{
    currentLength: number 
    maxLength: number
}

export interface SkillsProps{
    value: Array<string>
    currentSkill: string
    isEmpty: boolean
    emptyErrorMsg: string
    alreadyExists: boolean
    alreadyExistsMsg: string
    skillAddedMsg: string
    skillRemovedMsg: string
}

