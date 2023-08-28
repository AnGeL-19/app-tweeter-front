import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { LoadingComponent } from '../LoadingComponent'
import { NotDataComponent } from '../NotDataComponent'
import { fetcher } from '../../helpers/fetch'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'
import Post from './Post'

export const ShowPosts = ({query, params}) => {

    const [optionPage, setOptionPage] = useState({
        page: 1,
        limit: 5
    })

    const [hasMore, setHasMore] = useState(false);
    const [tweets, setTweets] = useState([])
    const { data, isLoading } = useSWR(`${query}?${new URLSearchParams({...optionPage,...params})}`, fetcher,{
        revalidateOnFocus: false,
        refreshInterval: 0
    })

    const ref = useRef(null)
    
    const entry = useIntersectionObserver(ref, { rootMargin: '10%' })
    const isVisible = !!entry?.isIntersecting
  

    useEffect(() => {
        setTweets([])
        setOptionPage( opt => ({
            ...opt,
            page: 1
        }))  
    }, [query, params])


    useEffect(() => {
        
        if(data){
            setHasMore(data.data.length > 0)
            setTweets(prev => [...prev, ...data.data])
        }

    }, [data])
    

    useEffect(() => {

        if (isVisible && hasMore) {
            setOptionPage( opt => ({
                ...opt,
                page: opt.page + 1
            }))  
        }

    },[isVisible,hasMore])

    return (
        <div className="div__sohw_post" >

            <section className="show_posts">

                {
                    (tweets)
                        &&
                    tweets.map((tweet) => (
                        <Post 
                            key={tweet.tid}                                      
                            tweet={tweet} 
                        />
                    ))
                    
                }  


                {
                    (isLoading)
                    ?
                    <LoadingComponent />
                    : 
                    (tweets.length === 0)
                        &&
                    <NotDataComponent text={'No Tweets'} />   
                }
                   
            </section>   

            {
                !isLoading
                &&
                <div ref={ref}></div>
            } 
        </div>
    )
}
