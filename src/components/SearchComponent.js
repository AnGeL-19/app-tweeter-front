import React, { useState } from 'react'
import { ComponentBtn } from './ComponentBtn'

export const SearchComponent = ({setFetch, people}) => {

    const [valueSearch, setValueSearch] = useState({
        search: ''
    })

    const handlePost = (e) => {
        e.preventDefault()
        console.log(`user/people?search=${valueSearch.search}`);
        if (people) {
            setFetch(`user/people?search=${valueSearch.search}`,{}, 'GET')
        }else{
            setFetch(`tweets/search?find=${valueSearch.search}`,{}, 'GET')
        }
        
        console.log(valueSearch);

    }

  return (
    <form className="form_icon_input_btn" onSubmit={handlePost}>

        <div className="icon_input_btn">
            <span className="material-icons gray3Color">
                search
            </span>
            <input 
                type="text" 
                placeholder="Search"
                name='search'
                value={valueSearch.search}
                onChange={ (e)=> setValueSearch((value)=>({
                    ...value,
                    [e.target.name]: e.target.value
                }))}
            />
            <ComponentBtn type={'submit'} median txtBtn="Search" />
        </div>

    </form>
  )
}
