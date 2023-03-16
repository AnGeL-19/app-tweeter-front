import React from 'react'

export const ComponentBtn = ({type,className,big,normal,median,full,addicon,txtBtn,functionBtn,disabled}) => {

    return (
            
        <button
        disabled={disabled} 
        type={type || 'button'}
        onClick={functionBtn}
        className={
            `btn-icon 
            ${normal ? 'btn-normal':''} 
            ${big ? 'btn-big' : ''}
            ${median ? 'btn-median' : ''}
            ${full ? 'btn-full' : ''}
            ${className}`}>

            {
                addicon
                &&
                (
                <span className="material-icons">
                    {addicon}
                </span>    
                )

            }
            
            <span>{txtBtn}</span>       
        </button>
        
    )
}
