import React from 'react'

export default function Errors ({errors} : {errors : Array<string>}) {
    return(
        <div>
            {errors.map(error => {
                return (
                    <div className = 'error'> 
                    <p><li>{error}</li></p>
                    </div>
                    )
        
            })}
        </div>

    )
   
}