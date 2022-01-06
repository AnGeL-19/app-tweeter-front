import React from 'react'
import { FilterPost } from '../components/FilterPost'
import { HeaderTweeter } from '../components/header/HeaderTweeter'

import { ShowPosts } from '../components/ShowPost/ShowPosts'

export const BookmarksPage = () => {

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

    return (
        <div>
            <HeaderTweeter />
            
            <div className="bookmarks_container_main">

                <main className="container_main">

                    <div className="div_filter">

                        <FilterPost filters={objFilter}/>

                    </div>

                    <ShowPosts />

                </main>
            </div>

        </div>
    )
}
