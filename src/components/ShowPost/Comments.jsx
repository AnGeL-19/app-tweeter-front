import React, { useState } from 'react'
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation'

import { Comment } from './Comment';

export const Comments = ({comments,lengthComments}) => {

    const [valueComments, setValueComments] = useState(comments)

    console.log(lengthComments > valueComments.length );
    console.log(lengthComments, valueComments.length );

    const handleMoreComments = () => {
        console.log('more');
    }


    return (
        <div className="people_comments">
                    
            {
                valueComments.map((comment) => (
                    <Comment key={comment.cid} comment={comment} />
                ))
            }

            {
                (lengthComments > valueComments.length)
                    &&
                <div className="moreComments">
                    <span 
                        className='span_moreCommments'
                        onClick={handleMoreComments}
                    >More comments</span>
                </div>
                
            }

        </div>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    lengthComments: PropTypes.number
}