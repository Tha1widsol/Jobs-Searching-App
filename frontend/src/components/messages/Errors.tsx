import React from 'react'

export default function Errors ({errors} : {errors : Array<string>}) {
    return(
        <div>
            {errors.map((error,index) => {
                return (
                    <div className = 'error' key = {index}> 
                    <p><li>{error}</li></p>
                    </div>
                    )
        
            })}
        </div>

    )
   
}