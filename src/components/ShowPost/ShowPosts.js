import React from 'react'
import { Post } from './Post'


export const ShowPosts = ({tweets}) => {

    return (
        <div className="div__sohw_post">

            <section className="show_posts">

                {
                    tweets.map((tweet,index) => (
                        <Post key={tweet.tid+index} tweet={tweet} tid={tweet.tid}/>
                    ))
                }
                
            </section>      

        </div>
    )
}
