import React, { useEffect, useState } from 'react'
import { FilterPost } from '../components/FilterPost'
import { Layout } from '../components/layout/Layout'

import { ShowPosts } from '../components/ShowPost/ShowPosts'

const objFilter = [
    {
        nameObj: 'tweets',
        select: true,
        name: 'Tweets',
        url: `tweets/saved`,
        params: {}
    },
    {
        nameObj: 'TweetsReplies',
        select: false,
        name: 'Tweets & replies',
        url: '',
        params: {}
    },
    {
        nameObj: 'media',
        select: false,
        name: 'Media',
        url: '',
        params: {}
    },
    {
        nameObj: 'likes',
        select: false,
        name: 'Likes',
        url: `tweets/liked`,
        params: {}
    },
]

export const BookmarksPage = () => {


    const [filter, setFilter] = useState(objFilter)
    const [queryData, setQueryData] = useState(filter.filter(f => f.select)[0].url)
    const [queryDataParams, setQueryDataParams] = useState(filter.filter(f => f.select)[0].params)

    useEffect(() => {
        setQueryData(filter.filter(f => f.select)[0].url)
        setQueryDataParams(filter.filter(f => f.select)[0].params)
    },[filter])
    

    return (
        <Layout>
            
            <div className="bookmarks_container_main">

                    <div className="div_filter">

                    <FilterPost filters={ filter }  setFilter={ setFilter }/>

                    </div>

                    <div className="div__explore__posts">

                    <ShowPosts 
                        query={
                            queryData
                        } 
                        params={
                            queryDataParams
                        }
                    /> 
                   
                    </div>
                    
            </div>

        </Layout>
    )
}
