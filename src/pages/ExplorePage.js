import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { fetchGetApi } from '../helpers/fetch'

export const ExplorePage = () => {

    const {token} = useSelector(state => state.auth);
    const [dataTweets, setDataTweets] = useState([])
    
    console.log(dataTweets);
    useEffect(() => {
        
        const respData = async () => {
            const data = await fetchGetApi('tweets/populates',token)
            const resp = await data.json();

            setDataTweets(resp.tweets)
        }
        respData()

        return () => {
            
        }
    }, [])

    const objFilter = [
        {
            nameObj: 'top',
            select: true,
            name: 'Top'
        },
        {
            nameObj: 'lastest',
            select: false,
            name: 'Lastest'
        },
        {
            nameObj: 'people',
            select: false,
            name: 'People'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
    ]


    return (
        <div>
            <HeaderTweeter />

            <div className="explore_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter}/>

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

                        <ShowPosts tweets={dataTweets}/>
                      
                    </div>

                </main>
            </div>


        </div>
    )
}
