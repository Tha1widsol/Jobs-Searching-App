import React  from "react";

export function handleFixName(e: React.KeyboardEvent<HTMLInputElement>){
    const spaceRegex = /\s/g  
    e.currentTarget.value = e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1);  
    e.currentTarget.value = e.currentTarget.value.replace(spaceRegex, '');
    e.currentTarget.value = e.currentTarget.value.charAt(0) + e.currentTarget.value.slice(1).toLowerCase()
}

export const getcurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
  
    return `${yyyy}-${mm}-${dd}`;
  }