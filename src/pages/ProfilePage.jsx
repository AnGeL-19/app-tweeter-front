import React, { Suspense, useState } from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { FilterPost } from '../components/FilterPost'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ProfileInfo } from '../components/profile/ProfileInfo'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { LoadingComponent } from '../components/LoadingComponent'
import { fetcher } from '../helpers/fetch'
import { EditProfile } from '../components/profile/EditProfile'
import { Modal } from '../components/modal/Modal'

// const Modal = lazy(() => import('../components/modal/Modal'))

export const ProfilePage = () => {

    const param = useParams();
    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `user/${param.id}/tweets`,
            params: {}
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: `user/${param.id}/tweets/retweets`,
            params: {}
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            params: {}
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes',
            url: `user/${param.id}/tweets`,
            params: {
                filter: 'likes'
            }
        },
    ]

    const user = useSelector(state => state.user);

    const { data: userInfo, isLoading } = useSWR(`user/${param.id}`, fetcher)


    const [showModalFollowers, setShowModalFollowers] = useState(false);
    const [showModalEditInfo, setShowModalEditInfo] = useState(false);

    const [filterFollower, setFilterFollower] = useState(false);

    const [filter, setFilter] = useState(objFilter)
    const [queryData, setQueryData] = useState('')  
    const [queryDataParams, setQueryDataParams] = useState({})

    useEffect(() => {
        setQueryData(filter.find(f => f.select).url)
        setQueryDataParams(filter.find(f => f.select).params)
    },[filter])

    return (
        <>

            <div className="container_profile">

                {   
                    userInfo
                    &&
                    (
                        <>

                        <div className="profile__container_main">
        
                            {
                                (isLoading)
                                ? <LoadingComponent />
                                : 
                                (
                                    <>
                                        <ProfileInfo dataUser={ userInfo.data } 
                                            user = { user }
                                            setFilterFollower={ setFilterFollower } 
                                            setShowModal={ setShowModalFollowers }
                                            setShowModalEdit={ setShowModalEditInfo }
                                        /> 

                                        <main className="container_main">
            
                                            <div className="div_filter">
                    
                                            <FilterPost filters={ filter }  setFilter={ setFilter } />
                    
                                            </div>
                    
                                            <div className="div__container_posts">
                                                <ShowPosts query={queryData} params={queryDataParams} />
                                            </div>
                                            
                    
                                        </main>
                                    </>
                                )
                                
                            }

                        </div>
                        </>  
                    )
                }
                
                

            </div>

            {
                showModalFollowers
                    && 
                <Suspense fallback={<LoadingComponent />}>
                    <Modal  title={filterFollower ? 'Following':'Followers'} setShowModal={setShowModalFollowers}>
                        <ModalFollow userName={ userInfo.data.name } isFollowers={filterFollower} />
                    </Modal>
                </Suspense>
                  
           
            }

            {
                showModalEditInfo 
                    && 
                <Suspense fallback={<LoadingComponent />}>
                    <Modal title={'Edit Profile'} setShowModal={setShowModalEditInfo}>
                        <EditProfile />
                    </Modal>
                </Suspense>
                
           
            }
        
        </>
    )
}
