import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchApi, fetchGetApi } from '../../helpers/fetch'
import { hashtagText } from '../../helpers/findHashtag'
import { useForm } from '../../hooks/useForm'

import { UserInfoBasic } from '../UserInfoBasic'
import { AddComment } from './AddComment'
import { Comments } from './Comments'
import { SocialActions } from './SocialActions'

export const Post = ({tweet,tid}) => {

    const {userTweet} = tweet;
    
    const user = useSelector(state => state.user);
    
    const [showAddComment, setShowAddComment] = useState(false);
    
    const [valuesStatus, setValuesStatus] = useState({
        likes: tweet.likes || [],
        retweets: tweet.retweets || [],
        saved: tweet.saved || [],
        comments: tweet.comentPeople || []
    })

    return (
        <div className="div__post">

            {
                tweet.userRetweet
                &&
                (
                <div className="div__retweet">
                    <span className="material-icons gray3Color">
                    cached
                    </span>
                    <span className="user_retweet gray3Color">
                        {tweet.userRetweet}
                    </span>
                </div>
                )
            }
            

            <div className="post">

                <UserInfoBasic uid={userTweet.uid}  
                                img={userTweet.imgUser} 
                                name={userTweet.name} 
                                date={tweet.date}
                                followers={userTweet.followers} 
                                addDate
                                />

                <p className="description_post"
                >
                    {hashtagText(tweet.description)}
                </p>

                {
                    tweet.imgTweet
                        &&
                    (
                        <div className="image_post">
                            <img src={tweet.imgTweet} alt="" />
                        </div>
                    )
                }
                

                <div className="post__characteristics">
                    <span className="characteristics">{valuesStatus.comments.length || 0} Comments</span>
                    <span className="characteristics">{valuesStatus.retweets.length || 0} Retweets</span>
                    <span className="characteristics">{valuesStatus.likes.length || 0} Likes</span>
                    <span className="characteristics">{valuesStatus.saved.length || 0} Saved</span>
                </div>

                <SocialActions 
                user={user} 
                tweet={tweet}
                showAddComment={showAddComment}
                setShowAddComment={setShowAddComment}
                valuesStatus={valuesStatus}
                setValuesStatus={setValuesStatus}
                />

                {/* <div className="btns_social_acations">

                    <button 
                    onClick={handleAddComment}
                    className= {`btn_comments btn-icon btn__social_action`}>
                        <span className="material-icons">
                            mode_comment
                        </span>
                        <span>
                            Comment
                        </span>
                    </button>
                    <button
                    onClick={handleRetweet} 
                    className={`btn_retweets btn-icon btn__social_action ${
                        valuesStatus.retweets.includes(user.uid) ? 'btn_retweets_retweeted': ''
                    }`}>
                        <span className="material-icons">
                            cached
                        </span>
                        <span>
                            {valuesStatus.retweets.includes(user.uid) ? 'Retweeted': 'Retweet'}
                        </span>
                    </button>
                    <button 
                    onClick={handleLike}
                    className={`btn_likes btn-icon btn__social_action ${
                        valuesStatus.likes.includes(user.uid) ? 'btn_likes_liked': ''
                    }`}>
                        <span className="material-icons">
                            favorite_border
                        </span>
                        <span>
                            {valuesStatus.likes.includes(user.uid) ? 'Liked': 'Like'}
                        </span>
                    </button>
                    <button 
                    onClick={handleSaved}
                    className={`btn_saved btn-icon btn__social_action ${
                        valuesStatus.saved.includes(user.uid) ? 'btn_save_saved': ''
                    }`}>
                        <span className="material-icons">
                            bookmark_border
                        </span>
                        <span> 
                            {valuesStatus.saved.includes(user.uid) ? 'Saved': 'Save'}
                        </span>
                    </button>

                </div> */}

                {

                    showAddComment
                    &&
                    <AddComment tid={tid} user={user}  />

                }
                

                {/* crear componente */}
                <div className="people_comments">
                    
                    {
                        valuesStatus.comments.map((comment) => (
                            <Comments key={comment.cid} comment={comment} />
                        ))
                    }

                </div>
            </div>

        </div>
    )
}
