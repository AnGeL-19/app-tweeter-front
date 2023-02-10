import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchApi, fetchGetApi } from '../../helpers/fetch'
import { hashtagText } from '../../helpers/findHashtag'
import { FileImage } from '../FileImage'
import { UserInfoBasic } from '../UserInfoBasic'
import { Comments } from './Comments'

export const Post = ({tweet,tid}) => {

    const {userTweet} = tweet;
    const user = useSelector(state => state.user);
    const {token} = useSelector(state => state.auth);
    const extensions = ["jpg","png","gif","svg"];

    const [addComment, setAddComment] = useState(false);
    const [imageCmt, setImageCmt] = useState(null);

    const [valuesStatus, setValuesStatus] = useState({
        likes: tweet.likes || [],
        retweets: tweet.retweets || [],
        saved: tweet.saved || [],
        comments: tweet.comentPeople || []
    })

    // console.log(valuesStatus);

    const [valuesCmt, setValuesCmt] = useState('');

    const handleEliminateImgComment = () => {
        console.log("eliminar");
        setImageCmt(null);
    }

    const handleFileChangeCmt = (e) => {
        const file = e.target.files[0];

        if(file){

            
            valuesCmt.ImgCmt = file;

            console.log(valuesCmt.ImgCmt);

            const extension = valuesCmt.ImgCmt.name.split(".");
            console.log(extension);

            const ext = extension[extension.length-1];
            console.log(ext);

            if(extensions.includes(ext.toLowerCase())){

                console.log( URL.createObjectURL(valuesCmt.ImgCmt) );

                setImageCmt( URL.createObjectURL(valuesCmt.ImgCmt) );

                console.log(imageCmt);
            //     setSucces(true);
            //     setError(false);
            //     dispatch(changeImgUser(file));
            }else{
            //     setSucces(false);
            //     setError(true);
            }
        }
        
    }

    const handleLike = async () => {
        const respt = await fetchApi({
            idTweet: tweet.tid
        },
        'tweet/like', 
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

    const handleAddComment = () => {
        console.log('commetns');
        setAddComment(!addComment);
        setValuesCmt('')
    }

    const handleRetweet = async () => {
        console.log('Retweet');
        const respt = await fetchApi({
            idTweet: tweet.tid
        },
        'tweet/retweet', 
        'PUT',
        token)
        const info = await respt.json();
        if(info.ok){
            if (valuesStatus.retweets.includes(user.uid)) {
                setValuesStatus(status => ({
                    ...status,
                    retweets: valuesStatus.retweets.filter(retweet => retweet !== user.uid)
                }))
            }else{
                setValuesStatus(status => ({
                    ...status,
                    retweets: [...valuesStatus.retweets, user.uid]
                }))
            }
        }else{
            console.log(info);
        }
    }

    const handleSaved = async () => {
        console.log('Saved');
        const respt = await fetchApi({
            idTweet: tweet.tid
        },
        'tweet/save', 
        'PUT',
        token)
        const info = await respt.json();
        if(info.ok){
            if (valuesStatus.saved.includes(user.uid)) {
                setValuesStatus(status => ({
                    ...status,
                    saved: valuesStatus.saved.filter(save => save !== user.uid)
                }))
            }else{
                setValuesStatus(status => ({
                    ...status,
                    saved: [...valuesStatus.saved, user.uid]
                }))
            }
        }else{
            console.log(info);
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("holis",valuesCmt);
        const respt = await fetchApi({
            idTweet: tweet.tid,
            comment : valuesCmt       
        },
        'tweet/msg', 
        'POST',
        token)
        const info = await respt.json();

        if (info.ok) {

            const { userComment, ...rest } = info.newCommet
            const newCmmt = {
                ...rest,
                userComment: {
                    uid: user.uid,
                    name: user.name,
                    imgUser: user.imgUser
                }
            }
            setValuesStatus(status => ({
                ...status,
                comments: [...valuesStatus.comments, newCmmt]
            }))
            setAddComment(!addComment);
            setValuesCmt('')
        }else{
            console.log(info);
        }
 
    }


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

                <div className="btns_social_acations">

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

                </div>

                {

                    addComment
                    &&
                    (
                        <div className="user__input_image_comment">

                        <div className="img__input_comment">

                            <div className="img__comment">
                                <img src={userTweet.imgUser}  alt={userTweet.name}/>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="txt_comments">
                                    <textarea 
                                    id="txtcomment"
                                    placeholder="Tweet your reply"
                                    onChange={(e) => setValuesCmt(e.target.value)}
                                    >

                                    </textarea>
                                    <div className="gallery_file">

                                        <input type="file" 
                                            id={tid} // poner id de delpost
                                            hidden
                                            accept=".jpg, .jpeg, .png" 
                                            onChangeCapture={handleFileChangeCmt}
                                            multiple/>

                                        <label htmlFor={tid} // poner id de delpost
                                                                        > 
                                            <span className="material-icons gray3Color">
                                                    collections
                                            </span>

                                        </label>

                                        {
                                            valuesCmt.length > 0
                                            &&
                                            (
                                            <button type='submit'>
                                                <span className="material-icons gray3Color">
                                                        send
                                                </span>
                                            </button>
                                            )
                                        }
                                        
                                    </div>
                                    
                                </div>
                            </form>

                        </div>

                        {
                            imageCmt
                            &&
                            <FileImage image={imageCmt} 
                                        functionCmt={handleEliminateImgComment}
                                        small />
                        }
                        </div>
                    )


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
