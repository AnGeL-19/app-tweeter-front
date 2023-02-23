import React, { memo } from 'react'
import { LoadingComponent } from '../LoadingComponent'
import { NotDataComponent } from '../NotDataComponent'
import { Post } from './Post'


export const ShowPosts = memo(({tweets, loading, error}) => {
    // loading || error
    return (
        <div className="div__sohw_post">

            <section className="show_posts">

                {
                    ( true )
                    ? <LoadingComponent />
                    :
                    (!tweets || tweets.length === 0)
                    ? <NotDataComponent text={'No hay Tweets :('} />
                    :
                    tweets.map((tweet,index) => (
                        <Post key={tweet.tid+'tw'} tweet={tweet} tid={tweet.tid}/>
                    ))
                    
                }
                
            </section>      

        </div>
    )
})
