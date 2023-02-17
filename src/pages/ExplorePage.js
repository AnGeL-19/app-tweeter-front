import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'
import { ShowPoeple } from '../components/ShowPeople/ShowPoeple'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { fetchGetApi } from '../helpers/fetch'
import { useFetch } from '../hooks/useFetch'
import { useQuery } from '../hooks/useQuery'

export const ExplorePage = () => {

    const objFilter = [
        {
            nameObj: 'top',
            select: true,
            name: 'Top',
            url: 'tweets/populates?filter=top'
        },
        {
            nameObj: 'lastest',
            select: false,
            name: 'Lastest',
            url: 'tweets/populates?filter=lastest'
        },
        {
            nameObj: 'people',
            select: false,
            name: 'People',
            url: 'user/people'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            url: ''
        },
    ]

    const query = useQuery()
    const hashtag = query.get("hashtag");
    // console.log(hashtag);

    const {token} = useSelector(state => state.auth);

    const [dataResponse, setDataResponse] = useState([])
    const [filter, setFilter] = useState(objFilter)
    const [dataPeople, setDataPeople] = useState([])

    const [ data, loading, error, setLabelFetch ] = useFetch(`tweets/populates?filter=top`,{},'GET',token)


    // console.log(data, loading, error);
    useEffect( () => {

        if(hashtag){
            setLabelFetch(`tweets/hashtag/search?hashtag=%23${hashtag}`)
            setDataPeople([])
            // setDataResponse(data.data) 
            query.delete("hashtag")
        }

        if(filter.find(f => f.nameObj === 'people').select){

            setDataResponse([]) 
            setDataPeople(data.data)
            
        }else{
            // setDataPeople([])
            // setDataResponse(data.data)
        }

          setDataResponse(data.data)   
                
        console.log('amonos 2', data.data);
        

    },[data,hashtag])


    // useEffect(() => {

         // if (query.get("hashtag") ) {
        //     setLabelFetch(`tweets/hashtag/search?hashtag=%23${query.get("hashtag")}`)
        //     query.delete("hashtag")
        //     setDataResponse(data.data)        
        // }

    // }, [loading])

    return (
        <div>
            <HeaderTweeter />

            <div className="explore_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={ filter } setLabel={ setLabelFetch } setFilter={ setFilter }/>

                    </div>

                    <div className="div__input__post">

                        <form className="form_icon_input_btn">

                            <div className="icon_input_btn">
                                <span className="material-icons gray3Color">
                                    search
                                </span>
                                <input type="text" placeholder="Search"/>
                                <ComponentBtn median txtBtn="Search" />
                            </div>

                        </form>

                        {
                            (dataPeople.length !== 0)
                            ? <ShowPoeple users={ dataPeople } loading={ loading } error={error}/>
                            : <ShowPosts tweets={ dataResponse } loading={ loading } error={error}/>  
                        }
                        
                      
                    </div>

                </main>
            </div>


        </div>
    )
}
