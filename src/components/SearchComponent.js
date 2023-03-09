import React, { useState } from 'react'
import { ComponentBtn } from './ComponentBtn'

export const SearchComponent = ({setParam}) => {

    const [valueSearch, setValueSearch] = useState({
        search: ''
    })

    const handleValue = (e) => {
        e.preventDefault()
        setParam(prev => ({
            ...prev,
            ...valueSearch
        }))
       
        console.log(valueSearch);
        setValueSearch({
            search: ''
        })
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
