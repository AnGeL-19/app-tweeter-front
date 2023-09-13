import React, { useEffect, useState } from 'react'
import { FilterPost } from '../components/FilterPost'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { useRef } from 'react'
import { queryDataParams, queryDataParamsApi, selectedFilter, selectedParam } from '../helpers/selectedRoute'
import { useQuery } from '../hooks/useQuery'
import { useParams } from 'react-router-dom'



export const BookmarksPage = () => {

    const query = useQuery();
    const param = useParams();
    

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `tweets/saved`,
            page: '/bookmarks',
            filter: '/tweets'
        },
        {
            nameObj: 'tweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: '',
            page: '/bookmarks',
            filter: '/tweetsReplies'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            url: '',
            page: '/bookmarks',
            filter: '/media'
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes', 
            url: `tweets/liked`,
            page: '/bookmarks',
            filter: '/likes'
        },
    ]

    const filters = useRef(selectedFilter(objFilter, param.filter))
    const urlData = useRef(filters.current.find(f => f.select))
    // const filter = selectedParam(filters.current,param.filter)
    const baseUrl = useRef(queryDataParamsApi(urlData.current, query))
    // const baseUrlWeb = useRef(queryDataParams(filter))
    

    return (
            
            <div className="bookmarks_container_main">

                    <div className="div_filter">

                        <FilterPost filters={ filters.current } query={query.toString()} />

                    </div>

                    <div className="div__explore__posts">

                        <ShowPosts query={
                                baseUrl.current
                            }
                        />
                   
                    </div>
                    
            </div>

    )
}
