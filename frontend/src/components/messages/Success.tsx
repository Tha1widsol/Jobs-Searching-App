import React from 'react'

export default function Success({success} : {success : string}) {
    return (
        <div>
            {success ? <li className='success'> {success}</li> : null}
        </div>
    )
}