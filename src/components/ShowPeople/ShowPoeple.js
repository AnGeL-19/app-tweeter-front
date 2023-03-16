import React, { createRef, lazy, memo, Suspense, useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
// import { ItemWTFollow } from '../home/ItemWTFollow'
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import { fetcher } from '../../helpers/fetch'

const ItemWTFollow = lazy(() => import("../home/ItemWTFollow"))

export const ShowPoeple = memo(({query, params}) => {

  const [optionPage, setOptionPage] = useState({
    start: 0, 
    end: 10,
    limit: 10
})

const [hasMore, setHasMore] = useState(false);
const [users, setUsers] = useState([])

const { data, isLoading, error } = useSWR(`${query}?${new URLSearchParams({...optionPage,...params})}`, fetcher,
{
    revalidateOnFocus: false,
    // revalidateOnMount:false,
    // revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
})
console.log('cambio');

useEffect(() => {
    setUsers([])
    setOptionPage( opt => ({
        ...opt,
        start: 0,
        end: 10
    }))  
}, [query, params])


useEffect(() => {
    
    if(data){
        console.log(data, data.data.length > 0);
        setHasMore(data.data.length > 0)
        setUsers(prev => [...prev, ...data.data])
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
            end: opt.end + opt.limit
        }))  
    }
  })
  if (node) observer.current.observe(node)
}, [isLoading,hasMore])


  return (
    <div className="div__sohw_people">

            <section className="show_people">

                <Suspense fallback={<LoadingComponent />}>
                    {
                        (users)
                            &&
                        users.map((user,index) => {
                            if (users.length === index+1 ) {
                                return <ItemWTFollow
                                  ref={lastTweetElementRef} 
                                  key={user.uid+index} 
                                  user={user}
                                />
                            } else {
                                return <ItemWTFollow 
                                  key={user.uid+index} 
                                  user={user}
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
                    (users.length === 0)
                        &&
                    <NotDataComponent text={'No hay users :('} />   
                }
            </section>      

        </div>
  )
})
