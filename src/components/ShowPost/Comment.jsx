import React, { useState } from 'react'
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetcherPut } from '../../helpers/fetch';
import { hashtagText } from '../../helpers/findHashtag';
import { dateFormat } from '../../helpers/formatDate'

export const Comment = ({comment}) => {

    const user = useSelector(state => state.user);
    // const {token} = useSelector(state => state.auth);
    const { trigger, isMutating } = useSWRMutation(`tweet/likeCmmt`, fetcherPut)

    const [valuesStatus, setValuesStatus] = useState({
        likes: comment.likes || [],
    })

    const handleLike = async () => {
        
        const result = await trigger({
            idComment: comment.cid
        }, /* options */)

        if (!result.ok) throw new Error('Error', result)

        if(result.ok){
            if (valuesStatus.likes.includes(user.uid)) {
                setValuesStatus(status => ({
                    ...status,
                    likes: valuesStatus.likes.filter(likeUser => likeUser !== user.uid)
                }))
            }else{
                setValuesStatus(status => ({
                    ...status,
                    likes: [...valuesStatus.likes, user.uid]
                }))
            }
        }
    }

    return (
        
        <div className="user_comment">

            <div className="img_user">
                <NavLink to={`/profile/${comment.userComment.uid}`}>
                    <img src={comment.userComment.imgUser} alt={comment.userComment.name}/>
                </NavLink>
            </div>
            <div className="comment_likes">
                <div className="info_comment">

                    <div className="info_user">
                        <NavLink to={`/profile/${comment.userComment.uid}`}>
                            <span className="name_user">
                                {comment.userComment.name}
                            </span>
                        </NavLink>
                        <span className="date_comment">
                            {dateFormat(comment.date)}
                        </span>
                    </div>
                    {
                        comment.imgComment
                        &&
                        <div className="img_comment">
                            <img src={comment.imgComment} alt={comment.userComment.name}/>
                        </div>
                    }
                    
                    <p className="comment">
                        {hashtagText(comment.commentText)}
                    </p>
                </div>

                <div className="cont_likes"
                    onClick={handleLike}>

                    <div className={`like ${
                        valuesStatus.likes.includes(user.uid) ? 'like_liked': ''
                    }`}>
                        <span className="material-icons">
                            favorite_border
                        </span>
                        <span className="txtlike">
                            {valuesStatus.likes.includes(user.uid) ? 'Liked': 'Like'}
                        </span>
                    </div>
                    
                    {
                        valuesStatus.likes.length > 0
                        &&
                        (
                        <span className="txtCont">
                            {
                                valuesStatus.likes.length > 1 
                                ? `${valuesStatus.likes.length} Likes` 
                                : `${valuesStatus.likes.length} Like`
                            }
                        </span>
                        )
                    }
                    
                </div>
            </div>

        </div>
  
    )
}


Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
