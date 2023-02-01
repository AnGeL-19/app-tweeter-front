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
import { useQuery } from '../hooks/useQuery'

export const ExplorePage = () => {

 
    const query = useQuery()

    const {token} = useSelector(state => state.auth);
    const [data, setData] = useState([])
    const [peopleWhoFollow, setPeopleWhoFollow] = useState(false)
    
    // console.log(data);
    // console.log(query.get("hashtag"));

    useEffect(() => {
        // /hashtag/search
        // ?hashtag=${query.get("name")}
        const respData = async () => {
            const data = !query.get("hashtag") 
            ? await fetchGetApi(`tweets/populates`,token)
            : await fetchGetApi(`tweets/hashtag/search?hashtag=%23${query.get("hashtag")}`,token)

            const resp = await data.json();

            setData(resp.data)
        }
        respData()

        return () => {
            
        }
    }, [])

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
            // url: 'user/people'
        },
    ]


    return (
        <div>
            <HeaderTweeter />

            <div className="explore_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter} setFilter={setData} setShowPeople={setPeopleWhoFollow}/>

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
                            peopleWhoFollow 
                            ? <ShowPoeple users={data}/>
                            : <ShowPosts tweets={data}/>
                            
                        }
                        
                      
                    </div>

                </main>
            </div>


        </div>
    )
}
