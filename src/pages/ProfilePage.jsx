import React, { Suspense, useState } from 'react'
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
import { useQuery } from '../hooks/useQuery'
import { useRef } from 'react'
import { queryDataParamsApi, selectedFilter,  } from '../helpers/selectedRoute'



export const ProfilePage = () => {

    const query = useQuery();
    const param = useParams();

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `user/${param.id}/tweets`,
            page: `/profile/${param.id}`,
            filter: '/tweets'
        },
        {
            nameObj: 'tweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: `user/${param.id}/tweets/retweets`,
            page: `/profile/${param.id}`,
            filter: '/tweetsReplies'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media',
            page: `/profile/${param.id}`,
            filter: '/media'
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes',
            url: `user/${param.id}/tweets`,
            page: `/profile/${param.id}`,
            filter: '/likes'
        },
    ]

    const user = useSelector(state => state.user);

    const { data: userInfo, isLoading } = useSWR(`user/${param.id}`, fetcher)

    const [showModalFollowers, setShowModalFollowers] = useState(false);
    const [showModalEditInfo, setShowModalEditInfo] = useState(false);
    const [filterFollower, setFilterFollower] = useState(false);

    const filters = useRef(selectedFilter(objFilter, param.filter))
    const urlData = useRef(filters.current.find(f => f.select))
    const baseUrl = useRef(queryDataParamsApi(urlData.current, query))


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
                    
                                                <FilterPost filters={ filters.current } query={query.toString()} />
                    
                                            </div>
                    
                                            <div className="div__container_posts">
                                            <ShowPosts query={
                                                    baseUrl.current
                                                }
                                            />
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
