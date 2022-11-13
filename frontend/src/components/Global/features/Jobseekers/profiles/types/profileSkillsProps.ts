import { StatusProps } from "../../../../types/status"

export interface ProfileSkillsProps extends StatusProps{
    values: [{
        id: number,
        name: string
        specific: boolean
    }]
}
export interface ProfileSkillProps{
        id: number,
        name: string
        specific: boolean
}