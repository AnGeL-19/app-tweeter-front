import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetApi } from '../helpers/fetch'

export const FilterPost = ({filters, setFilter, setShowPeople }) => {

    // ARREGLAR
    const {token} = useSelector(state => state.auth);
    const [selectF, setSelectFilter] = useState(filters);

    const handleSelect = async (filter) => {

        // BUSCAR FILTRADO, - HACER FETCH
        console.log(filter);

        const data = await fetchGetApi(filter.url,token)
        const resp = await data.json();
        console.log(resp);
        
       
        if (filter.nameObj === 'people') {
            setShowPeople(resp.data)
        }else{
            setFilter(resp.data)
            setShowPeople([])
        }

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
