import React,{useState,useEffect} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../types/forms';

export default function List({
    name, 
    edit,
    values,
    state, 
    handleAdd,
    handleClearInput,
    handleSetIsEmpty, 
    handleSetAlreadyExists, 
    handleSetAll
    }
    :{
     name: string, 
     edit: boolean
     values: [{name: string}]
     state: ListProps, 
     handleAdd: (currentVal: string) => void,
     handleClearInput: () => void,
     handleSetIsEmpty: (empty?: boolean) => void, 
     handleSetAlreadyExists: (exists?: boolean) => void, 
     handleSetAll: (newItems: Array<string>) => void}
     ){
       
    const [items,setItems] = useState<Array<{name: string}>>([])
    const [errors,setErrors] = useState<Array<string>>([])

    useEffect(() => {
        if (!edit) return
        setItems(values)
    },[edit, values])

    function handleRemoveItem(item: string){
        const newItems = [...state.value]
        const frontendNewItems = [...items]
        let index = newItems.findIndex(obj => obj === item)
        let frontendIndex = items.findIndex(obj => obj.name === item)
        newItems.splice(index,1)
        frontendNewItems.splice(frontendIndex,1)
        setItems(frontendNewItems)
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

        setItems(prev => [...prev,{ name: currentItem}])
        handleAdd(currentItem)
        handleClearInput()
        setErrors([]) 
    }

    return (
        <div>
            <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddItem}>Add</button>
            <Errors errors = {errors}/>
            {items.length ? <p>{name}: ({items.length}):</p> : null}
            
            <div className = 'list'>
                <ReactScrollableFeed>
                    {items.map((item,index) => {
                        return (
                            <div key = {index} style = {{display:'flex',justifyContent:'space-between'}}>
                                <li>{item.name}</li>
                                <button type = 'button' onClick = {() => handleRemoveItem(item.name)} style = {{padding:'10px'}}>Remove</button>
                            </div>
                        )
                    })}
                </ReactScrollableFeed>
            </div>
        </div>
    )
}
