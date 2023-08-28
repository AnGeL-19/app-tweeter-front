import React, { useEffect, useState } from 'react'

export const FilterPost = ({filters, setFilter }) => {

    const [selectF, setSelectFilter] = useState(filters);

    // useEffect(() => {

    //     setFilter(filters.find(f => f.select).url)

    // },[])


    const handleSelect = async (e,filter) => {
        e.preventDefault();
        
        const updateObj = selectF.map(f => {
            if (f.nameObj === filter.nameObj) {
                return {
                    ...f,
                    select: true
                }
            }else{
                return {
                    ...f,
                    select: false
                }
            }
        })

        setFilter(updateObj) 
        setSelectFilter(updateObj);       
        
    }


    return (
        <div className="filters_post">

            {

                selectF.map((filter) => (
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
