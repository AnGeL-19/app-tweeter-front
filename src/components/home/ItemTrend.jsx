import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

 const ItemTrend = memo(({trend}) => {

    return (
        <div className="trends___tweets">
            <NavLink to={`/explore/top?hashtag=${trend.nameHashtag.slice(1,trend.nameHashtag.length)}`} 
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
})

export default ItemTrend