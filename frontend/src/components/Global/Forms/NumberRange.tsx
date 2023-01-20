import React from 'react'

export default function NumberRange({start = 0, end}: {start?: number, end: number}) {
    const getRange = (start: number, end: number) => {
        const range = []
        for (let i = start; i <= end; i++){
            range.push(i)
        }
        return range
    }     

  const range = getRange(start, end)

 return ( 
    <>
        {range.map(r => {
          return <option key = {r} value = {r}>{r}</option>
        })}
    </>
  
 )
}
