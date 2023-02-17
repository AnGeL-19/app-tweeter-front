import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ProfileInfo } from '../components/profile/ProfileInfo'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { fetchGetApi } from '../helpers/fetch'
import { useFetch } from '../hooks/useFetch'

export const ContextShowModal = createContext();

export const ProfilePage = () => {

    const params = useParams();

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

    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [filterFollower, setFilterFollower] = useState(false);
    const [dataTweets, setDataTweets] = useState([])
    

    const [dataUser, setDataUser] = useState({})

    const [ data, loading, error, setLabelFetch ] = useFetch(`tweets/${params.id}?limit=5&start=1&end=5`,{},'GET',token)

    const [ dataUs, loadingUser , errorUser , setLabelFetchUser ] = useFetch(`user/${params.id}`,{},'GET',token)

    console.log(data.data, dataUs.data);

    useEffect(() => {
        
        if (params.id !== user.uid) {

            setLabelFetchUser(`user/${params.id}`)
            setDataUser(dataUs.data);
            console.log(dataUs.data,'-----------');

        }else{
            setDataUser(user);
        }

    }, [dataUs])

    useEffect(()=>{
        setDataTweets(data.data )
        return() => setDataTweets([])
    },[data])

    return (
        <>

            <div className="container_profile">

                <HeaderTweeter />

                {   
                    dataUser
                    &&
                    (
                        <>

                        <div className="profile__container_main">
        
                            {
                                loadingUser
                                ? <span>Loading...</span>
                                : 
                                (
                                    <>
                                        <ProfileInfo dataUser={ dataUser } 
                                            user = { user }
                                            setFilterFollower={ setFilterFollower } 
                                            setShowModal={ setShowModal }
                                        /> 

                                        <main className="container_main">
            
                                            <div className="div_filter">
                    
                                                <FilterPost 
                                                    filters={objFilter} 
                                                    setLabel={ setLabelFetch } 
                                                />
                    
                                            </div>
                    
                                            <ShowPosts tweets={dataTweets} loading={ loading } />
                    
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
