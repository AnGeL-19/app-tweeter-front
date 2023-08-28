import React, { Suspense, useState } from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom';
import { fetcher } from '../../helpers/fetch';
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import { ItemUserModal } from './ItemUserModal'
import { useRef } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useEffect } from 'react';

export const ModalFollow = ({userName, isFollowers}) => {


    const param = useParams();
    const ref = useRef(null)

    const [optionPage, setOptionPage] = useState({
        page: 1,
        limit: 4
    })

    const [hasMore, setHasMore] = useState(false);
    const [usersF, setUsersF] = useState([])

    const entry = useIntersectionObserver(ref, { rootMargin: '10%' })
    const isVisible = !!entry?.isIntersecting

    const { data, isLoading } = useSWR(`${isFollowers ? `user/followers/${param.id}`: `user/following/${param.id}`}?${new URLSearchParams({...optionPage})}`,fetcher)


    useEffect(() => {
    
        if(data){
            setHasMore(data.data.length > 0)
            setUsersF(prev => [...prev, ...data.data])
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
     
        <>
            <div className="div_name_user">
                <span className="name_user_following">{userName} is {isFollowers ? 'Following':'Followers'}</span>
            </div>
            <div className="users_followers">

                <Suspense fallback={<LoadingComponent />}>
                    {
                        (usersF && usersF.length > 0)
                        &&
                        usersF.map((userf) => (
                            <div key={userf.uid}>
                                <div className="line"></div>
                                <ItemUserModal user={userf}  />
                            </div>
                        ))      
                    }  
                </Suspense>    


                {
                    (isLoading)
                    ?
                    <LoadingComponent />
                    : 
                    (!usersF || usersF.length === 0)
                        &&
                    <NotDataComponent text={'No users'} />  
                }

              {
                !isLoading
                &&
                <div ref={ref}></div>
            }   
            </div>                
        </>

    )
}
