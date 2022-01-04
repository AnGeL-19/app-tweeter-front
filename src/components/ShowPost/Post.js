import React, { useState } from 'react'
import { FileImage } from '../FileImage'
import { UserInfoBasic } from '../UserInfoBasic'
import { Comments } from './Comments'

export const Post = () => {

    const user = {
        img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
        name: 'Mikael Stanley',
        other: '24 August at 20:43 ',
    }

    const extensions = ["jpg","png","gif","svg"];

    const [imageCmt, setImageCmt] = useState(null);

    const [valuesCmt, setValuesCmt] = useState({
        txtCmt: "",
    });


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

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("holis");


    }


    return (
        <div className="div__post">

            <div className="div__retweet">
                <span className="material-icons gray3Color">
                cached
                </span>
                <span className="user_retweet gray3Color">
                    Daniel Jensen Retweeted
                </span>
            </div>

            <div className="post">

                <UserInfoBasic  img={user.img} 
                                name={user.name} 
                                other={user.other} />

                <p className="description_post">
                    Traveling – it leaves you speechless, then turns you into a storyteller.
                </p>

                <div className="image_post">
                    <img src="https://www.highdefwallpaper.com/wp-content/uploads/2017/06/a-screenshot-from-space-engine.jpg" alt="" />
                </div>

                <div className="post__characteristics">
                    <span className="characteristics">449 Comments</span>
                    <span className="characteristics">59k Retweets</span>
                    <span className="characteristics">234 Saved</span>
                </div>

                <div className="btns_social_acations">

                    <button className="btn_comments btn-icon btn__social_action">
                        <span className="material-icons">
                            mode_comment
                        </span>
                        <span>
                            Comment
                        </span>
                    </button>
                    <button className="btn_retweets 
                                        btn-icon
                                        btn__social_action">
                        <span className="material-icons">
                            cached
                        </span>
                        <span>
                            Retweet
                        </span>
                    </button>
                    <button className="btn_likes btn-icon btn__social_action">
                        <span className="material-icons">
                            favorite_border
                        </span>
                        <span>
                            Like
                        </span>
                    </button>
                    <button className="btn_saved btn-icon btn__social_action">
                        <span className="material-icons">
                            bookmark_border
                        </span>
                        <span>
                            Saved
                        </span>
                    </button>

                </div>

                <div className="user__input_image_comment">

                    <div className="img__input_comment">

                        <div className="img__comment">
                            <img src={user.img}  alt={user.name}/>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="txt_comments">
                                <textarea id="txtcomment"
                                placeholder="Tweet your reply">

                                </textarea>
                                <div className="gallery_file">

                                    <input type="file" 
                                        id="fileGalleryCmt" // poner id de delpost
                                        hidden
                                        accept=".jpg, .jpeg, .png" 
                                        onChangeCapture={handleFileChangeCmt}
                                        multiple />

                                    <label htmlFor="fileGalleryCmt"  // poner id de delpost
                                                                    > 
                                   
                                        <span className="material-icons gray3Color">
                                                collections
                                        </span>

                                    </label>
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
                        // <div className="file_img">
                        //     <div className="btn_exit">
                        //         <button onClick={handleEliminateImg}>
                        //             <span className="material-icons">
                        //                 close
                        //             </span>
                        //         </button>
                        //     </div>
                        //     <div className="image_post">
                        //         <img src={image} alt="userimg" />
                        //     </div>   
                        // </div>
                    }
                </div>

                {/* crear componente */}
                <div className="people_comments">
                    
                    <Comments />
                    <Comments />

                </div>
            </div>

        </div>
    )
}
