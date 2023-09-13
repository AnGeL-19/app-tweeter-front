import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'
// import { ItemWTFollow } from '../home/ItemWTFollow'
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import { fetcher } from '../../helpers/fetch'
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useRef } from 'react';

const ItemWTFollow = lazy(() => import("../home/ItemWTFollow"))

export const ShowPoeple = memo(({query}) => {

  const [optionPage, setOptionPage] = useState({
    page: 1,
    limit: 10
    })

    const [hasMore, setHasMore] = useState(false);

    const ref = useRef(null)
    const [users, setUsers] = useState([])

    const { data, isLoading } = useSWR(`${query}${query.includes('?')?'&':'?'}${new URLSearchParams({...optionPage})}`, fetcher)

    const entry = useIntersectionObserver(ref, { rootMargin: '10%' })
    const isVisible = !!entry?.isIntersecting

    useEffect(() => {
        setUsers([])
        setOptionPage( opt => ({
            ...opt,
            page: 1
        }))  
        return () => {
            setUsers([])
            setOptionPage( opt => ({
                ...opt,
                page: 1
            })) 
            setHasMore(false)
        }
    }, [])

    useEffect(() => {
        setUsers([])
        setOptionPage( opt => ({
            ...opt,
            page: 1
        }))  
    }, [query])


    useEffect(() => {
    
        if(data){
            setHasMore(data.data.length > 0)
            setUsers(prev => [...prev, ...data.data])
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
    <div className="div__sohw_people">

            <section className="show_people">

                <Suspense fallback={<LoadingComponent />}>
                    {
                        (users && users.length > 0)
                        &&
                        users.map((user) => (
                            <ItemWTFollow
                                key={user.uid} 
                                user={user}
                            />
                        ))       
                    }  
                </Suspense>    


                {
                    (isLoading)
                    ?
                    <LoadingComponent />
                    : 
                    (!users || users.length === 0)
                        &&
                    <NotDataComponent text={'No users'} />  
                }
            </section>  

            {
                !isLoading
                &&
                <div ref={ref}></div>
            } 
        </div>
  )
})
