import React from 'react'
import PropTypes from 'prop-types';


export const HeaderReweet = ({userRetweet}) => {
  return (
    <div className="div__retweet">
        <span className="material-icons gray3Color">
        cached
        </span>
        <span className="user_retweet gray3Color">
            {userRetweet}
        </span>
    </div>
  )
}

HeaderReweet.Caracteristics = {
    userRetweet: PropTypes.string
}
