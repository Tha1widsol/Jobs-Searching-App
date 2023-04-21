import { StatusProps } from "../../../../components/Global/types/status"

export interface JobSkillsProps extends StatusProps{
    values: [{
        id: number,
        name: string
        specific: boolean
    }]
}
export interface JobSkillProps{
        id: number,
        name: string
        specific: boolean
}