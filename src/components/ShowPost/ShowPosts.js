import React, { createRef, lazy, memo, Suspense, useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { LoadingComponent } from '../LoadingComponent'
import { NotDataComponent } from '../NotDataComponent'
import { fetcher } from '../../helpers/fetch'

const Post = lazy(() => import("./Post"))

export const ShowPosts = ({query, params}) => {

    const [optionPage, setOptionPage] = useState({
        start: 0, 
        end: 5,
        limit: 5
    })

    const [hasMore, setHasMore] = useState(false);
    const [tweets, setTweets] = useState([])
    const { data, isLoading, error } = useSWR(`${query}?${new URLSearchParams({...optionPage,...params})}`, fetcher)
   
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
    

    const observer = createRef();
    const lastTweetElementRef = useCallback(node => {

      if (isLoading) return
      if (observer.current) observer.current.disconnect() 
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setOptionPage( opt => ({
                ...opt,
                start: opt.end,
                end: opt.end + opt.end
            }))  
        }
      })
      if (node) observer.current.observe(node)
    }, [isLoading,hasMore])


    

    return (
        <div className="div__sohw_post">

            <section className="show_posts">

                <Suspense fallback={<LoadingComponent />}>
                    {
                        (tweets)
                            &&
                        tweets.map((tweet,index) => {
                            if (tweets.length === index+1 ) {
                                return <Post 
                                        ref={lastTweetElementRef}  
                                        key={tweet.tid+index+'t'} 
                                        tweet={tweet} 
                                        tid={tweet.tid}
                                    />
                            } else {
                                return <Post  
                                        key={tweet.tid+index+'t'} 
                                        tweet={tweet} 
                                        tid={tweet.tid} 
                                    />
                            }
                        })
                         
                    }  
                </Suspense>    


                {
                    (isLoading)
                    ?
                    <LoadingComponent />
                    : 
                    (tweets.length === 0)
                        &&
                    <NotDataComponent text={'No hay Tweets :('} />   
                }

            </section>      

        </div>
    )
}
