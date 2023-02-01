import React from 'react'
import { HeaderTweeter } from '../components/header/HeaderTweeter';
import { CreatePost } from '../components/Post/CreatePost';
import { Trends } from '../components/home/Trends';
import { WhoToFollow } from '../components/home/WhoToFollow';
import { ShowPosts } from '../components/ShowPost/ShowPosts';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchGetApi } from '../helpers/fetch';



export const HomePage = () => {

    const {token} = useSelector(state => state.auth);
    const [dataTweets, setDataTweets] = useState([])
    
    console.log(dataTweets);
    // localhost:8080/api/tweets/?limit=5&start=1&end=5
    
    useEffect(() => {
        
        const respData = async () => {
            const data = await fetchGetApi('tweets/?limit=5&start=1&end=5',token)
            const resp = await data.json();

            setDataTweets(resp.data)
        }
        respData()

    return () => {
        
    }
    }, [])
    
    return (
        <div>
            <HeaderTweeter />
            <div className="home_container__main">

                <main className="main__posts__aside">

                    <div className="div__create_post_show">

                        <CreatePost />
                        
                        <ShowPosts tweets={dataTweets}/>

                    </div>

                    <div className="div__section__aside">

                        <Trends  />

                        <WhoToFollow />

                    </div>
                </main>
          
            </div>
            
        </div>
    )
}
