import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FilterPost } from '../components/FilterPost'
import { Layout } from '../components/layout/Layout'
import { SearchComponent } from '../components/SearchComponent'
import { ShowPoeple } from '../components/ShowPeople/ShowPoeple'

import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { useFetch } from '../hooks/useFetch'
import { useQuery } from '../hooks/useQuery'

const objFilter = [
    {
        nameObj: 'top',
        select: true,
        name: 'Top',
        url: 'tweets/populates',
        params: {
            filter: 'top'
        }
    },
    {
        nameObj: 'lastest',
        select: false,
        name: 'Lastest',
        url: 'tweets/populates',
        params: {
            filter: 'lastest'
        }
    },
    {
        nameObj: 'people',
        select: false,
        name: 'People',
        url: `user/people`,
        params: {}
    },
    {
        nameObj: 'media',
        select: false,
        name: 'Media',
        url: '',
        params: {}
    },
]

export const ExplorePage = () => {

    const query = useQuery()
    const hashtag = query.get("hashtag");

    const [showPeople, setShowPeople] = useState(false)

    const [filter, setFilter] = useState(objFilter)
    const [queryData, setQueryData] = useState(filter.filter(f => f.select)[0].url)
    const [queryDataParams, setQueryDataParams] = useState(filter.filter(f => f.select)[0].params)
    
    useEffect(() => {

        if(filter.find(f => f.nameObj === 'people').select){
            setShowPeople(true)
        }else{
            setShowPeople(false)
        }
        
        setQueryData(hashtag ? `tweets/hashtag/search` : filter.filter(f => f.select)[0].url)
        setQueryDataParams(hashtag ? {hashtag: `#${hashtag}`}: filter.filter(f => f.select)[0].params)

    },[filter,hashtag])

    return (
        <Layout>

            <div className="explore_container_main">

                {/* <main className="container_main"> */}

                    <div className="div_filter">

                        <FilterPost filters={ filter }  setFilter={ setFilter }/>

                    </div>

                    <div className="div__input__post">

                        <SearchComponent setParam={setQueryDataParams} />

                        {
                            (showPeople)
                            ? <ShowPoeple query={
                                queryData
                            } 
                            params={
                                queryDataParams
                            }/>
                            : 
                            <ShowPosts query={
                                queryData
                            } 
                            params={
                                queryDataParams
                            }
                            />  
                        }
                        
                      
                    </div>

                {/* </main> */}
            </div>


        </Layout>
    )
}
