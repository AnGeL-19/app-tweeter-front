import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { hashtagText } from '../../helpers/findHashtag'

import { UserInfoBasic } from '../UserInfoBasic'
import { Comments } from './Comments'
import { AddComment } from '../ShowPost/AddComment'
import { SocialActions } from './SocialActions'
import { Caracteristics } from './Caracteristics'
import { HeaderReweet } from './HeaderReweet';

const Post =  React.forwardRef(({tweet}, ref) => {

    const {userTweet} = tweet;
    const user = useSelector(state => state.user);

    const [showAddComment, setShowAddComment] = useState(false);
    
    const [valuesStatus, setValuesStatus] = useState({
        likes: tweet.likes || [],
        nLikes: tweet.nLikes || 0,
        retweets: tweet.retweets || [],
        nRetweets: tweet.nRetweets || 0,
        saved: tweet.saved || [],
        nSaved: tweet.nSaved || 0,
        comments: tweet.comentPeople || [],
        nComments: tweet.nComentPeople || 0
    })

    return (
        <div    ref={ref}
                className="div__post">

            {
                tweet.userRetweet
                &&
                (
                <HeaderReweet userRetweet={tweet.userRetweet} />
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
                

                <Caracteristics valueCaracteristics={valuesStatus} />

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
                    <AddComment 
                        tid={tweet.tid} 
                        user={user} 
                        valuesStatus={valuesStatus} 
                        setValuesStatus={setValuesStatus}
                    />

                }
                

                <Comments 
                    tid={tweet.tid} 
                    comments={valuesStatus.comments} 
                    lengthComments={tweet.nComentPeople} 
                />
                
            </div> 
           

        </div>
    )
})

Comment.Post = {
    tweet: PropTypes.object.isRequired
}

export default Post;
