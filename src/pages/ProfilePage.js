import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ShowPosts } from '../components/ShowPost/ShowPosts'
import { fetchGetApi } from '../helpers/fetch'

export const ContextShowModal = createContext();

export const ProfilePage = () => {

    const params = useParams();
    const user = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [filterFollower, setFilterFollower] = useState(false);
    const [dataTweets, setDataTweets] = useState([])
    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        setDataUser(user)
    },[user])

    useEffect(() => {
        
        if (params.id !== user.uid) {
            const respDataUser = async () => {
                const data = await fetchGetApi(`user/${params.id}`,token)
                const resp = await data.json();
                
                if (resp.user) {
                    setDataUser(resp.data)
                }else{
                    setDataUser(user)
                }  
            }
            respDataUser()
        }else{
            setDataUser(user);
        }

        const respData = async () => {
            const data = await fetchGetApi(`tweets/${params.id}?limit=5&start=1&end=5`,token)
            const resp = await data.json();
            setDataTweets(resp.data)
        }

        respData()

    }, [params.id])

    const objFilter = [
        {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets'
        },
        {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies'
        },
        {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
        {
            nameObj: 'likes',
            select: false,
            name: 'Likes'
        },
    ]

    const handleShowModalFollowing = () => {
        setShowModal(true);
        setFilterFollower(true)
    }

    const handleShowModalFollowers = () => {
        setShowModal(true);
        setFilterFollower(false)
    }

    return (
        <>

            <div className="container_profile">

                <HeaderTweeter />

                {   
                    dataUser
                    &&
                    (
                        <>
                        <div className="profile_img_background">
                            {
                                dataUser
                                && 
                                (<img src={dataUser.imgUserBackground} alt={dataUser.name} />)
                            }
                            
                            
                        </div>
        
                        <div className="profile__container_main">
        
                            <div className="info_profile">
        
                            <div className="user_img_info">
        
                                    <div className="user_img">
                                        <img src={dataUser.imgUser}  alt={dataUser.name}/>
                                    </div>
                                    <div className="user_info">
                                        <div className="characteristics">
                                            <div className="name_user" >
                                                <span className=" gray1Color">
                                                   {dataUser.name}
                                                </span>
                                            </div>
                                            <div className="fwll"
                                                 onClick={() => handleShowModalFollowing()}>
                                                <span className="wBlack">
                                                    {dataUser.nfollowing}
                                                    {/* dataUser.following.length ||  */}
                                                </span>
                                                <span className="user_following ">
                                                    Following                                    
                                                </span>
                                            </div>
                                            <div className="fwll"
                                                onClick={() => handleShowModalFollowers()}>
                                                <span className="wBlack">
                                                    { dataUser.nfollowers}
                                                    {/* dataUser.followers.length || */}
                                                </span>
                                                <span className="user_following ">
                                                    Followers                                    
                                                </span>
                                            </div >
                                        </div>
                                        <p className="description">
                                            {dataUser.bio || 'Empty'}
                                        </p>
                                    </div>
        
                            </div>
                           
                               {
                                    (dataUser.uid !== user.uid)
                                        &&
                                    <ComponentBtn big 
                                    txtBtn={user.following?.includes(dataUser.uid) ? 'Unfollow': 'Follow'}
                                    addicon={user.following?.includes(dataUser.uid) ? 'person_remove': 'person_add'}/>
                                    //    
                               } 
        
                            </div>
                            <main className="container_main">
        
                                <div className="div_filter">
        
                                    <FilterPost filters={objFilter} />
        
                                </div>
        
                                <ShowPosts tweets={dataTweets} />
        
                            </main>
        
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
