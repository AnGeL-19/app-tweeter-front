import React, { memo } from 'react'
import { Post } from './Post'


export const ShowPosts = memo(({tweets, loading, error}) => {
    // !tweets || tweets.length === 0 ||
    return (
        <div className="div__sohw_post">

            <section className="show_posts">

                {
                    ( loading || error)
                    ? <samp>Loading...</samp>
                    :
                    tweets.map((tweet,index) => (
                        <Post key={tweet.tid+index} tweet={tweet} tid={tweet.tid}/>
                    ))
                }
                
            </section>      

        </div>
    )
})
