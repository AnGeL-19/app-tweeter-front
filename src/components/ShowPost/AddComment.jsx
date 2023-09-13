import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm } from '../../hooks/useForm';
import { FileImage } from '../FileImage'
import { fetcherFile, fetcherPost } from '../../helpers/fetch';
import { toast } from 'react-toastify';
import { LoadingComponent } from '../LoadingComponent';

export const AddComment = ({user,tid,valuesStatus,setValuesStatus}) => {
 
    const { trigger, isMutating } = useSWRMutation('tweet/msg', fetcherPost)
    const { trigger: triggerFile } = useSWRMutation(`upload/image`, fetcherFile)

    const extensions = ["jpg","png","gif","svg"];

    const [imageCmt, setImageCmt] = useState({
        url: '',
        dataImage: null,
    });

    const { values, handleInputChange, reset } = useForm({
        comment: '',
    });

    const handleEliminateImgComment = () => {
        setImageCmt({
            url: '',
            dataImage: null,
        });
    }

    const handleFileChangeCmt = (e) => {
        const file = e.target.files[0];

        if(file){

            const extension = file.name.split(".");

            const ext = extension[extension.length-1];

            if(extensions.includes(ext.toLowerCase())){

                setImageCmt({
                    url: URL.createObjectURL(file),
                    dataImage: file
                });
            }
        }
        
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const newData = {
                idTweet: tid,
                comment : values.comment
            }
    
            if (imageCmt.dataImage) {
                const formdata = new FormData();
                formdata.append("fileImage", imageCmt.dataImage, imageCmt.url);
    
                const resultFile = await triggerFile(formdata, /* options */)

                if (resultFile.ok) {
                    newData.img = resultFile.url
                }
            }
    
            const result = await trigger(newData, /* options */)
    
            if (!result.ok) return;

                setValuesStatus(status => ({
                    ...status,
                    comments: [result.comment, ...valuesStatus.comments]
                }))

                handleEliminateImgComment()
                reset()
            
        } catch (error) {
            toast.warning('Error to create comment: ',{
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }
        
 
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
                        {/* && !image.url */}
                        {
                            (values.comment.length > 0 ) 
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
            imageCmt.dataImage
            &&
            <FileImage image={imageCmt.url} 
                        functionCmt={handleEliminateImgComment}
                        small />
        }

        {
            isMutating
            &&
            <LoadingComponent />  
        }

    </div>
  )
}
