import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { LoadingComponent } from '../LoadingComponent'
import { NotDataComponent } from '../NotDataComponent'
import { fetcher } from '../../helpers/fetch'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

const Post = lazy(() => import("./Post"))


export const ShowPosts = ({query, params}) => {

    const [optionPage, setOptionPage] = useState({
        start: 0, 
        end: 5,
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
            start: 0,
            end: 5
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
                start: opt.end,
                end: opt.end + opt.limit
            }))  
        }

    },[isVisible,hasMore])

    return (
        <div className="div__sohw_post" >

            <section className="show_posts">

                <Suspense fallback={<LoadingComponent />}>

                    {
                        (tweets)
                            &&
                        tweets.map((tweet,index) => (
                            <Post 
                                key={tweet.tid+index}                                      
                                tweet={tweet} 
                            />
                        ))
                        
                    }  

                </Suspense>

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
