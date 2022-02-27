import React  from "react";

export function handleFixName(e: React.KeyboardEvent<HTMLInputElement>){
    const spaceRegex = /\s/g  
    e.currentTarget.value = e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1);  
    e.currentTarget.value = e.currentTarget.value.replace(spaceRegex, '');
    e.currentTarget.value = e.currentTarget.value.charAt(0) + e.currentTarget.value.slice(1).toLowerCase()
}
