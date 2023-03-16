import React from 'react'
import { BtnSocialAction } from './BtnSocialAction';

export const SocialActions = ({tweet, user, showAddComment,setShowAddComment,valuesStatus, setValuesStatus}) => {

    const optionsActions = [
        {
            name: 'retweets',
            icon: 'cached',
            text: 'Retweet',
            textSelect: 'Retweeted',
            class: 'btn_retweets',
            classSelect: 'btn_retweets_retweeted',
            url: 'tweet/retweet',
            select: valuesStatus.retweets.includes(user.uid),
            values: valuesStatus.retweets
        },
        {
            name: 'likes',
            icon: 'favorite_border',
            text: 'Like',
            textSelect: 'Liked',
            class: 'btn_likes',
            classSelect: 'btn_likes_liked',
            url: 'tweet/like',
            select: valuesStatus.likes.includes(user.uid),
            values: valuesStatus.likes
        },
        {
            name: 'saved',
            icon: 'bookmark_border',
            text: 'Save',
            textSelect: 'Saved',
            class: 'btn_saved',
            classSelect: 'btn_save_saved',
            url: 'tweet/save',
            select: valuesStatus.saved.includes(user.uid),
            values: valuesStatus.saved
        }
    ]

    const handleAddComment = () => {
        console.log('commets');
        setShowAddComment(!showAddComment);
    }

  return (
    <div className="btns_social_acations">

        <button 
            onClick={handleAddComment}
            className= {`btn_comments btn-icon btn__social_action`}>
            <span className="material-icons">
                mode_comment
            </span>
            <span className="textSocial">
                Comment
            </span>
        </button>

        {
            optionsActions.map( (btnAction,index) => (
                <BtnSocialAction 
                    key={index}
                    user={user} 
                    tweet={tweet}
                    setValuesStatus={setValuesStatus} 
                    btnSocialAction={btnAction}
                />
            ))
        }

    </div>
  )
}
