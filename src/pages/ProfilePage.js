import React, {  useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ProfileInfo } from '../components/profile/ProfileInfo'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { Layout } from '../components/layout/Layout'
import { LoadingComponent } from '../components/LoadingComponent'



export const ProfilePage = () => {

    const params = useParams();

    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const { data: dataUser, loading: loadingUser, doFetch: doFetchUser } = useFetch(token)
    
    const { data: dataTweets, loading: loadingTweets , doFetch: doFetchTweets } = useFetch(token)

    const [showModal, setShowModal] = useState(false);
    const [filterFollower, setFilterFollower] = useState(false);

    const [dataTweetsInfo, setDataTweetsInfo] = useState([])
    const [dataUserInfo, setDataUserInfo] = useState({})

    useEffect(() => {
        
        if (params.id === user.uid) {
            setDataUserInfo(user);  
        }else{
            setDataUserInfo({})
            doFetchUser(`user/${params.id}`,{},'GET')
        }
        doFetchTweets(`tweets/${params.id}?limit=5&start=1&end=5`,{},'GET')
    }, [])


    useEffect(() => {
        if (params.id !== user.uid) {
            setDataUserInfo(dataUser.data) 
        }    
    }, [dataUser])
    

    useEffect(()=>{
        setDataTweetsInfo(dataTweets.data )
    },[dataTweets])

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets',
            url: `tweets/${params.id}`
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies',
            url: `tweets/retweets/${params.id}`
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes',
            url: `tweets/${params.id}?filter=likes`
        },
    ]

    const [filter, setFilter] = useState(objFilter)

    return (
        <>

            <HeaderTweeter />

            <div className="container_profile">

                {   
                    dataUserInfo
                    &&
                    (
                        <>

                        <div className="profile__container_main">
        
                            {
                                (!dataUserInfo && loadingUser)
                                ? <LoadingComponent />
                                : 
                                (
                                    <>
                                        <ProfileInfo dataUser={ dataUserInfo } 
                                            user = { user }
                                            setFilterFollower={ setFilterFollower } 
                                            setShowModal={ setShowModal }
                                        /> 

                                        <main className="container_main">
            
                                            <div className="div_filter">
                    
                                            <FilterPost 
                                                filters={ filter } 
                                                setFetch={ doFetchTweets } 
                                                setFilter={ setFilter }
                                            />
                    
                                            </div>
                    
                                            <ShowPosts tweets={dataTweetsInfo} loading={ loadingTweets } />
                    
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
                showModal
                    && 
                <ModalFollow  isFollowers={filterFollower} setShowModal={setShowModal} />
           
            }
            

        
        </>
    )
}
