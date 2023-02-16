import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { useFetch } from '../hooks/useFetch'

export const BookmarksPage = () => {

    const {token} = useSelector(state => state.auth);
    const [ data, loading, error ] = useFetch('tweets/saved',{},'GET',token)
    
    const [dataTweets, setDataTweets] = useState([])

    useEffect(()=>{
        setDataTweets(data.data )
        return() => setDataTweets([])
    },[data])

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `tweets/saved`
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: ''
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            url: ''
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes',
            url: `tweets/saved?filter=likes`
        },
    ]

    return (
        <div>
            <HeaderTweeter />
            
            <div className="bookmarks_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter} setFilter={setDataTweets} />

                    </div>


                    <ShowPosts tweets={dataTweets} loading={loading}/>

    
                </main>
            </div>

        </div>
    )
}
