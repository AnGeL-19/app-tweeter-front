import React, { useState } from 'react'
import { ComponentBtn } from './ComponentBtn'
import { useHistory } from 'react-router-dom';

export const SearchComponent = ({param, query}) => {

    let history = useHistory();
    const [valueSearch, setValueSearch] = useState('')

    const handleValue = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams(query);
        if(!searchParams.has("search")){
            searchParams.append("search", valueSearch)
        }else{
            searchParams.set("search", valueSearch)
        }

        history.push(`${param}${query.includes('?')?'&':'?'}${searchParams.toString()}`)
    }

  return (
    <form className="form_icon_input_btn" onSubmit={handleValue}>

        <div className="icon_input_btn">
            <span className="material-icons gray3Color">
                search
            </span>
            
            <input 
                type="text" 
                placeholder="Search"
                name='search'
                value={valueSearch}
                onChange={ (e)=> setValueSearch(e.target.value)}
            />

            <ComponentBtn type={'submit'} 
            median 
            disabled={ !(valueSearch.search.length > 0) }
            txtBtn="Search" 
            />
        </div>

    </form>
  )
}
