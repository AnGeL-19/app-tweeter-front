import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'
import { Layout } from '../components/layout/Layout'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { useFetch } from '../hooks/useFetch'

export const BookmarksPage = () => {

    const {token} = useSelector(state => state.auth);
    
    // const [ data, loading, error, setLabelFetch ] = useFetch('tweets/saved',{},'GET',token)
    const { data, loading, doFetch } = useFetch(token)
    const [dataTweets, setDataTweets] = useState([])


    useEffect(()=>{
        doFetch('tweets/saved',{},'GET')
    },[])

    useEffect(()=>{
        setDataTweets(data.data )
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

    const [filter, setFilter] = useState(objFilter)

    return (
        <Layout>
            
            <div className="bookmarks_container_main">

                {/* <main className="container_main"> */}

                    <div className="div_filter">

                    <FilterPost filters={ filter } setFetch={ doFetch } setFilter={ setFilter }/>

                    </div>

                    <div className="div__explore__posts">

                        <ShowPosts tweets={dataTweets} loading={loading}/>
                   
                    </div>
                    
                {/* </main> */}
            </div>

        </Layout>
    )
}
