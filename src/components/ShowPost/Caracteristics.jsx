import React from 'react'
import PropTypes from 'prop-types';

export const Caracteristics = ({valueCaracteristics}) => {
  return (
    <div className="post__characteristics">
        <span className="characteristics">{valueCaracteristics.nComments} Comments</span>
        <span className="characteristics">{valueCaracteristics.nRetweets} Retweets</span>
        <span className="characteristics">{valueCaracteristics.nLikes} Likes</span>
        <span className="characteristics">{valueCaracteristics.nSaved} Saved</span>
    </div>
  )
}

Comment.Caracteristics = {
    valueCaracteristics: PropTypes.number.isRequired
}
