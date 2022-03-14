import React,{useState} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../types/forms';

export default function List({name, 
    state, 
    handleSet,
    handleClearInput,
    handleSetIsEmpty, 
    handleSetAlreadyExists, 
    handleRemove
    }
    :{
     name: string, 
     state: ListProps, 
     handleSet: (currentVal: string) => void,
     handleClearInput: () => void,
     handleSetIsEmpty: (empty?: boolean) => void, 
     handleSetAlreadyExists: (exists?: boolean) => void, 
     handleRemove: (newItems: Array<string>) => void}
     ){

    const [errors,setErrors] = useState<Array<string>>([])


    function handleRemoveItem(item: string){
        const newItems = [...state.value]
        let index = newItems.findIndex(obj => obj === item)
        newItems.splice(index, 1)
        handleRemove(newItems)
        setErrors([])
    }

    function handleAddItem(){
        const currentItem = state.currentVal.trim()
        let errors: Array<string> = []
        
        if (currentItem.match(/^ *$/)) {
            handleSetIsEmpty()
            errors.push(state.emptyErrorMsg)
        }

        else handleSetIsEmpty(false)
    
        if (state.value.filter(item => item === currentItem).length > 0){
            handleSetAlreadyExists()
            errors.push(state.alreadyExistsMsg)
        }

        else handleSetAlreadyExists(false)

        if (errors.length){
            setErrors(errors)
            return
        }

        handleSet(currentItem)
        handleClearInput()
        setErrors([])
        
    }
    return (
        <div>
            
            <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddItem}>Add Role</button>
            <Errors errors = {errors}/>
            {state.value.length ? <p>{name}: ({state.value.length}):</p> : null}
                
            <div className = 'list'>
            <ReactScrollableFeed>
                {state.value.map((item,index) => {
                    return (
                        <div key = {index} style = {{display:'flex',justifyContent:'space-between'}}>
                            <li>{item}</li>
                            <button type = 'button' onClick = {() => handleRemoveItem(item)} style = {{padding:'10px'}}>Remove</button>
                        </div>
                    )
                })}
            </ReactScrollableFeed>
            </div>
        </div>
    )
}
