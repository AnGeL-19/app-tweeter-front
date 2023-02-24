import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { FileImage } from '../FileImage'

export const AddComment = ({user,tid}) => {

    const {token} = useSelector(state => state.auth);
    
    const extensions = ["jpg","png","gif","svg"];

    const [imageCmt, setImageCmt] = useState(null);
    const { values, handleInputChange, reset } = useForm({
        comment: '',
        ImgCmt: null
    });

    const handleEliminateImgComment = () => {
        console.log("eliminar");
        setImageCmt(null);
    }

    const handleFileChangeCmt = (e) => {
        const file = e.target.files[0];

        if(file){

            
            values.ImgCmt = file;

            console.log(values.ImgCmt);

            const extension = values.ImgCmt.name.split(".");
            console.log(extension);

            const ext = extension[extension.length-1];
            console.log(ext);

            if(extensions.includes(ext.toLowerCase())){

                console.log( URL.createObjectURL(values.ImgCmt) );

                setImageCmt( URL.createObjectURL(values.ImgCmt) );

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


    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(values);
        // console.log("holis",valuesCmt);
        // const respt = await fetchApi({
        //     idTweet: tweet.tid,
        //     comment : valuesCmt       
        // },
        // 'tweet/msg', 
        // 'POST',
        // token)
        // const info = await respt.json();

        // if (info.ok) {

        //     const { userComment, ...rest } = info.newCommet
        //     const newCmmt = {
        //         ...rest,
        //         userComment: {
        //             uid: user.uid,
        //             name: user.name,
        //             imgUser: user.imgUser
        //         }
        //     }
        //     setValuesStatus(status => ({
        //         ...status,
        //         comments: [...valuesStatus.comments, newCmmt]
        //     }))
        //     setAddComment(!addComment);
        //     setValuesCmt('')
        // }else{
        //     console.log(info);
        // }
 
    }

  return (
    <div className="user__input_image_comment">
        <div className="img__input_comment">

            <div className="img__comment">
                <img src={user.imgUser}  alt={user.name}/>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="txt_comments">
                    <textarea 
                    id="txtcomment"
                    name='comment'
                    value={values.comment}
                    placeholder="Tweet your reply"
                    onChange={(e) => handleInputChange(e)}
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
                            values.comment.length > 0
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
