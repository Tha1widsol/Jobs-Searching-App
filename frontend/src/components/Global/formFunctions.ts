export function handleFixName(e:any){
    const spaceRegex = /\s/g  
    e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);  
    e.target.value = e.target.value.replace(spaceRegex, '');
    e.target.value = e.target.value.charAt(0) + e.target.value.slice(1).toLowerCase()
}
