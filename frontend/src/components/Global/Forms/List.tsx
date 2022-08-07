import React,{useState,useEffect} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../types/forms';

export default function List({
    name, 
    state, 
    handleAdd,
    handleClearInput,
    handleSetIsEmpty, 
    handleSetAlreadyExists, 
    handleSetAll
    }
    :{
     name: string, 
     state: ListProps, 
     handleAdd: (currentVal: string) => void,
     handleClearInput: () => void,
     handleSetIsEmpty: (empty?: boolean) => void, 
     handleSetAlreadyExists: (exists?: boolean) => void, 
     handleSetAll: (newItems: Array<string>) => void}
     ){
       
    const [errors,setErrors] = useState<Array<string>>([])

    useEffect(() => {
        state.value = state.value.filter(item => item)
    },[state])

    function handleRemoveItem(item: string){
        const newItems = [...state.value]
        let index = newItems.findIndex(obj => obj === item)
        newItems.splice(index,1)
        handleSetAll(newItems)
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

        handleAdd(currentItem)
        handleClearInput()
        setErrors([]) 
    }

    return (
        <div>
            <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddItem}>Add</button>
            <Errors errors = {errors}/>
            {state.value.filter(item => item).length ?
            <div> 
                <div className = 'list'>
                {state.value.length ? <p>{name}: ({state.value.length})</p> : null}
                    <ReactScrollableFeed>
                        {state.value.map((item,index) => {
                            return (
                                <div className = 'rowSections' key = {index}>
                                    <li>{item}</li>
                                    <i className = 'fa fa-trash-o' onClick = {() => handleRemoveItem(item)} style = {{padding:'10px'}}/>
                                </div>
                            )
                        })}
                    </ReactScrollableFeed>
                </div>
            </div>
            : null}
            
        </div>
    )
}
