import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { fetchGetApi } from '../helpers/fetch'

export const BookmarksPage = () => {

    const {token} = useSelector(state => state.auth);
    const [dataTweets, setDataTweets] = useState([])
    
    console.log(dataTweets);
    useEffect(() => {
        
        const respData = async () => {
            const data = await fetchGetApi('tweets/saved',token)
            const resp = await data.json();

            setDataTweets(resp.data)
        }
        respData()

    }, [])

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets'
            
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes'
        },
    ]

    return (
        <div>
            <HeaderTweeter />
            
            <div className="bookmarks_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter}/>

                    </div>

                    <ShowPosts tweets={dataTweets}/>

                </main>
            </div>

        </div>
    )
}
