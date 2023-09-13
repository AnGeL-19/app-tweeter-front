import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

export const FilterPost = ({ filters, query }) => {

    let history = useHistory();
    
    const handleSelect = async (e,filter) => {
        e.preventDefault();
        history.push(`${filter.page}${filter.filter}${query.trim().length > 0 ? `?${query}`:''}`);         
    }


    return (
        <div className="filters_post">

            {

            filters.map((filter) => (
                    <div
                        key={filter.nameObj} 
                        onClick={(e) => handleSelect(e,filter)} 
                        className="filter" 
                        >
                        <div className={`line ${filter.select ? 'active-line' : ''}`} ></div>
                        <span id={`${filter.nameObj}`} 
                            className={`nameFilter ${filter.select ? 'active-text': 'gray3Color'}`}>
                            {filter.name}
                        </span>
                    </div>
                ))

            }

        </div>
    )
}
