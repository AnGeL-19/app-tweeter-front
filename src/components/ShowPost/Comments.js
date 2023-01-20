import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchApi } from '../../helpers/fetch';
import { hashtagText } from '../../helpers/findHashtag';
import { dateFormat } from '../../helpers/formatDate'

export const Comments = ({comment}) => {

    const {token,user} = useSelector(state => state.auth);
    const [valuesStatus, setValuesStatus] = useState({
        likes: comment.likes || [],
    })

    const handleLike = async () => {
        
        console.log(token,user.uid);
        const respt = await fetchApi({
            idComment: comment.cid
        },
        'tweet/likeCmmt', 
        'PUT',
        token)
        const info = await respt.json();
        if(info.ok){
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
        }else{
            console.log(info);
        }
    }

    return (
        
        <div className="user_comment">

            <div className="img_user">
                <img src={comment.userComment.imgUser} alt={comment.userComment.name}/>
            </div>
            <div className="comment_likes">
                <div className="info_comment">
                    <div className="info_user">
                        <span className="name_user">
                            {comment.userComment.name}
                        </span>
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
