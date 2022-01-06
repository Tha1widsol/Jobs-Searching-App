import React from 'react'

export default function Success({success} : {success : string}) {
    return (
        <div>
            <p>{success ? <li className='success'> {success}</li> : null}</p>
        </div>
    )
}