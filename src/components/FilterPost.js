import React, { useState } from 'react'

export const FilterPost = ({filters, setFilter }) => {

    // ARREGLAR
    const [selectF, setSelectFilter] = useState(filters);

    const handleSelect = (filter) => {

        // BUSCAR FILTRADO, - HACER FETCH

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
        setSelectFilter(updateObj);
 
    }


    return (
        <div className="filters_post">

            {

                selectF.map((filter) => (
                    <div onClick={() => handleSelect(filter)} 
                        className="filter" 
                        id={`${filter.nameObj}`}>
                        <div className={`line-left ${filter.select ? 'active-line' : ''}`} ></div>
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
