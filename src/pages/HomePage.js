import React from 'react'

import { CreatePost } from '../components/Post/CreatePost';
import { Trends } from '../components/home/Trends';
import { WhoToFollow } from '../components/home/WhoToFollow';
import { ShowPosts } from '../components/ShowPost/ShowPosts';
import { Layout } from '../components/layout/Layout';

export const HomePage = () => {


    return (
        <Layout>
            {/* <HeaderTweeter /> */}
            <div className="home_container__main">


                    <div className="div__create_post_show">

                        <CreatePost />
                        

                        <ShowPosts query={'tweets'}/>

                        

                    </div>

                    <div className="div__section__aside">

                        <Trends />

                        <WhoToFollow />

                    </div>

          
            </div>
            
        </Layout>
    )
}
