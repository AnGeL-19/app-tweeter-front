import React from 'react'
import { ItemWTFollow } from './ItemWTFollow'

export const WhoToFollow = () => {

    


    return (
        <aside className="aside__follow">

            <h2 className="title">Who to follow</h2>
            <div className="line"></div>

            <ItemWTFollow />

            <div className="line"></div>

            <ItemWTFollow />

        </aside>
    )
}
