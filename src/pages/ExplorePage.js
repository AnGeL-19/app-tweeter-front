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

export const ExplorePage = () => {

    const query = useQuery()
    const hashtag = query.get("hashtag");
    const {token} = useSelector(state => state.auth);
    const { data, loading, doFetch } = useFetch(token)
    const [dataTweets, setDataTweets] = useState([])
    const [dataPeople, setDataPeople] = useState([])

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
            url: `user/people`
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            url: ''
        },
    ]

    const [filter, setFilter] = useState(objFilter)

    useEffect(()=>{
 
        if(hashtag){
            doFetch(`tweets/hashtag/search?hashtag=%23${hashtag}`,{},'GET') 
            query.delete("hashtag");
            return;
        }

        doFetch(filter.filter(f => f.select)[0].url,{},'GET')

    },[])

    
    useEffect(() => {

        if(filter.find(f => f.nameObj === 'people').select){
            setDataPeople(data.data)
            setDataTweets([])
            return;
        }

        setDataTweets(data.data)
    },[data])

    return (
        <Layout>

            <div className="explore_container_main">

                {/* <main className="container_main"> */}

                    <div className="div_filter">

                        <FilterPost filters={ filter } setFetch={ doFetch } setFilter={ setFilter }/>

                    </div>

                    <div className="div__input__post">

                        <SearchComponent setFetch={doFetch} people={filter.find(f => f.nameObj === 'people').select} />

                        {
                            (filter.find(f => f.nameObj === 'people').select)
                            ? <ShowPoeple users={ dataPeople } loading={ loading }/>
                            : <ShowPosts tweets={ dataTweets } loading={ loading }/>  
                        }
                        
                      
                    </div>

                {/* </main> */}
            </div>


        </Layout>
    )
}
