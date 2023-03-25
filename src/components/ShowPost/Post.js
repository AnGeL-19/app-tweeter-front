import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { hashtagText } from '../../helpers/findHashtag'

import { UserInfoBasic } from '../UserInfoBasic'
import { AddComment } from './AddComment'
import { Comments } from './Comments'
import { SocialActions } from './SocialActions'

const Post =  React.forwardRef(({tweet,tid}, ref) => {

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
        <div    ref={ref}
                className="div__post">

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

                {

                    showAddComment
                    &&
                    <AddComment tid={tid} user={user} valuesStatus={valuesStatus} setValuesStatus={setValuesStatus} />

                }
                

                <Comments comments={valuesStatus.comments} lengthComments={4} />
                
            </div> 
           

        </div>
    )
})

export default Post;
