import React from 'react'

export const ComponentBtn = ({big,normal,median,addicon,txtBtn,functionBtn}) => {




    return (
            
        <button 
        onClick={functionBtn}
        className={
            `btn-icon 
            ${normal ? 'btn-normal':''} 
            ${big ? 'btn-big' : ''}
            ${median ? 'btn-median' : ''}`}>

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
