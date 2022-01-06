import React, { createContext, useContext, useState } from 'react'
import { ComponentBtn } from '../components/ComponentBtn'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ModalFollow } from '../components/profile/ModalFollow'
import { ShowPosts } from '../components/ShowPost/ShowPosts'

export const ContextShowModal = createContext();

export const ProfilePage = () => {

    const [showModal, setShowModal] = useState(false);

    const objFilter = {
        filter1: {
            nameObj: 'tweets',
            select: true,
            name: 'Tweets'
        },
        filter2: {
            nameObj: 'TweetsReplies',
            select: false,
            name: 'Tweets & replies'
        },
        filter3: {
            nameObj: 'media',
            select: false,
            name: 'Media'
        },
        filter4: {
            nameObj: 'likes',
            select: false,
            name: 'Likes'
        },
    }

    const handleShowModalFollowing = () => {
        setShowModal(!showModal);
        console.log("handleShowModalFollowing");
    }

    const handleShowModalFollowers = () => {
        setShowModal(!showModal);
        console.log("handleShowModalFollowers");
    }

    return (
        <>

            <div className="container_profile">

                <HeaderTweeter />

                <div className="profile_img_background">

                    <img src="https://th.bing.com/th/id/R.84663d3d09d036eac1a019942ad70f08?rik=cHmGw5%2fnbHE3HQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f6%2f7%2fb%2f1503343-zelda-master-sword-wallpaper-1920x1080-computer.jpg&ehk=z3OPqXBbpBoD%2fmuyXiioogCsOnBEpqL3rYsaJH2%2fybA%3d&risl=&pid=ImgRaw&r=0" alt="asd" />
                    
                </div>

                <div className="profile__container_main">

                    <div className="info_profile">

                    <div className="user_img_info">

                            <div className="user_img">
                                <img src="https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1" />
                            </div>
                            <div className="user_info">
                                <div className="characteristics">
                                    <div className="name_user" >
                                        <span className=" gray1Color">
                                            Daniel Jensen
                                        </span>
                                    </div>
                                    <div className="fwll"
                                         onClick={handleShowModalFollowing}>
                                        <span className="wBlack">
                                            2,569
                                        </span>
                                        <span className="user_following ">
                                            Following                                    
                                        </span>
                                    </div>
                                    <div className="fwll"
                                        onClick={handleShowModalFollowers}>
                                        <span className="wBlack">
                                            10.8K
                                        </span>
                                        <span className="user_following ">
                                            Followers                                    
                                        </span>
                                    </div >
                                </div>
                                <p className="description">
                                    Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
                                </p>
                            </div>

                    </div>

                        <ComponentBtn big txtBtn="Follow" addicon="person_add"/>

                    </div>
                    <main className="container_main">

                        <div className="div_filter">

                            <FilterPost filters={objFilter} />

                        </div>

                        <ShowPosts />

                    </main>

                </div>

            </div>

            {
                showModal
                    && 
                <ContextShowModal.Provider value={{handleShowModalFollowing,
                                                   handleShowModalFollowers}}>
                    <ModalFollow />
                </ContextShowModal.Provider>               
            }
            

        
        </>
    )
}
