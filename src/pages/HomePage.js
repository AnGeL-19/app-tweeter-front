import React from 'react'
import { HeaderTweeter } from '../components/HeaderTweeter'
import { CreatePost } from '../components/home/CreatePost';
import { Trends } from '../components/home/Trends';
import { WhoToFollow } from '../components/home/WhoToFollow';
import { ShowPosts } from '../components/ShowPost/ShowPosts';



export const HomePage = () => {



    
    return (
        <div>
            <HeaderTweeter />
            <div className="home_container__main">

                <main className="main__posts__aside">

                    <div className="div__create_post_show">

                        <CreatePost />
                        
                        <ShowPosts />

                    </div>

                    <div className="div__section__aside">

                        <Trends />

                        <WhoToFollow />

                    </div>
                </main>
          
            </div>
            
        </div>
    )
}
