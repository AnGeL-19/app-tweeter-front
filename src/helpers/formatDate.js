const months = 
["January", "February", 
"March", "April", "May", 
"June", "July", "August", 
"September", "October", 
"November", "December"];

// PONER DIAS ATRASADOS

export const dateFormat = (date) => {

    const format = new Date(date);
    return `${format.getDate()} ${months[format.getMonth()]} at ${format.getHours()}:${format.getMinutes()}` 

}