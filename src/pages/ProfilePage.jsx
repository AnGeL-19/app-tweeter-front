import React, {  useState } from 'react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ProfileInfo } from '../components/profile/ProfileInfo'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { LoadingComponent } from '../components/LoadingComponent'
import { fetcher } from '../helpers/fetch'
import { EditProfile } from '../components/profile/EditProfile'
import { Modal } from '../components/modal/Modal'



export const ProfilePage = () => {

    const param = useParams();
    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `tweets/${param.id}`,
            params: {}
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: `tweets/retweets/${param.id}`,
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
            url: `tweets/${param.id}`,
            params: {
                filter: 'likes'
            }
        },
    ]

    const user = useSelector(state => state.user);

    const { data: userInfo, isLoading, error } = useSWR(`user/${param.id}`, fetcher)


    const [showModalFollowers, setShowModalFollowers] = useState(false);
    const [showModalEditInfo, setShowModalEditInfo] = useState(false);

    const [filterFollower, setFilterFollower] = useState(false);

    const [filter, setFilter] = useState(objFilter)
    const [queryData, setQueryData] = useState('')
    const [queryDataParams, setQueryDataParams] = useState({})

    useEffect(() => {

        setQueryData(filter.filter(f => f.select)[0].url)
        setQueryDataParams(filter.filter(f => f.select)[0].params)

    },[filter])

    return (
        <>

            <HeaderTweeter />

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
                <Modal  title={filterFollower ? 'Following':'Followers'} setShowModal={setShowModalFollowers}>
                    <ModalFollow userName={ userInfo.data.name } isFollowers={filterFollower} />
                </Modal>  
           
            }

            {
                
                showModalEditInfo
                    && 
                <Modal title={'Edit Profile'} setShowModal={setShowModalEditInfo}>
                    <EditProfile />
                </Modal>
           
            }
        
        </>
    )
}
