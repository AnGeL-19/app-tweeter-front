import React from 'react'

export const ComponentBtn = ({big,normal,median,full,addicon,txtBtn,functionBtn}) => {




    return (
            
        <button 
        onClick={functionBtn}
        className={
            `btn-icon 
            ${normal ? 'btn-normal':''} 
            ${big ? 'btn-big' : ''}
            ${median ? 'btn-median' : ''}
            ${full ? 'btn-full' : ''}`}>

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
