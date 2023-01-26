import React from 'react'
import { NavLink } from 'react-router-dom'

export const ItemTrend = ({trend}) => {


    
    return (
        <div className="trends___tweets">
            <NavLink to={`/explore?hashtag=${trend.nameHashtag.slice(1,trend.nameHashtag.length)}`} 
                            // className="hashtag_link"
                        >
                <span className="name_trend">
                    {trend.nameHashtag}
                </span>
            </NavLink>
            <span className="number__tweets">
                {trend.nTweets} Tweets
            </span>
        </div>
    )
}
