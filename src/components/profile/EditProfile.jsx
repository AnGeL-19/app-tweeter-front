import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../action/userAction';
import { fetcherFilePut, fetcherPut } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { ComponentBtn } from '../ComponentBtn'
import { ToastContainer, toast } from 'react-toastify';
import { LoadingComponent } from '../LoadingComponent';
import { useSWRConfig } from 'swr';


export const EditProfile = () => {

    // const extensions = ["jpg","png","gif","svg"];
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

   
    const { trigger, isMutating } = useSWRMutation(`user/edit`, fetcherPut)
    const { mutate } = useSWRConfig()

    // const { trigger: triggerFile, isMutatingFile } = useSWRMutation(`upload/image/${valueImage}`, fetcherFilePut)

    const extensions = ["jpg","png","gif","svg"];

    const { values, handleInputChange, reset, setValues } = useForm({
        imgUserBackground: user.imgUserBackground,
        imgUser: user.imgUser,
        name: user.name,
        bio: user.bio,
        email: user.email,
        password: '',
    });

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            let objUser = {}
            const { password, ...rest } = values

            objUser = rest
            if ((password.trim().length > 0)) objUser.password = password

            const result = await trigger(objUser, /* options */)

            if (result.ok){
                toast.success(result.msg,{
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            }else{
                toast.warning(result.msg,{
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

            dispatch(updateUserInfo(values))

        } catch (error) {

            toast.warning('Error when creating a tweet ',{
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

    const handleFileChange = async (e) => {

        const value = e.target.name;
        const file = e.target.files[0];

        if(file){

            const extension = file.name.split(".");

            const ext = extension[extension.length-1];

            const splitName =  values.imgUser.split('/');
            const name = splitName[splitName.length - 1];
            const [ public_id ] = name.split('.');

            if(extensions.includes(ext.toLowerCase())){

                const formdata = new FormData();
                formdata.append("fileImage", file, URL.createObjectURL(file));
    
                const resultFile = await mutate(`upload/image/${public_id}`, fetcherFilePut(`upload/image/${public_id}`,formdata))
    
                if (!resultFile.ok) {
                    toast.warning('Error update Image',{
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    

                    return;
                }

                setValues((prev)=>({
                    ...prev,
                    [value]: resultFile.url
                }))

                const result = await trigger({
                    [value]: resultFile.url
                }, /* options */)

                if (result.ok){
                    toast.success('Image update success',{
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    dispatch(updateUserInfo({
                        ...values,
                        [value]: resultFile.url
                    }))
                }
                
            }
        }
        
    }

  return (

        <div className="edit-container">
            
            <div className="container_imgs_profile">

                <div className="div_img_background">

                    <div className="img_background">
                        <img className="imgBack" 
                            src={values.imgUserBackground} 
                            alt={values.name} />

                        <div className="blurImage"></div>
                    </div>

                    <div className='icon_input'>
                        
                        <input 
                            type="file" 
                            id={'fileBkProfile'}
                            name='imgUserBackground'
                            hidden
                            accept=".jpg, .jpeg, .png" 
                            onChangeCapture={(e)=>handleFileChange(e)}
                            multiple
                        />

                        <label htmlFor={'fileBkProfile'}> 
                            <span className="material-icons">
                                photo_camera
                            </span>
                        </label>
                       
                    </div>

                </div>

                <div className="container_profile">
                    <div className="div_img_profile">

                        <div className="img_profile">

                            <img className="imgProfile" 
                            src={values.imgUser} 
                            alt={values.name}/>

                            <div className="blurImage"></div>

                        </div>

                        <div className='icon_input'>

                            <input 
                                type="file" 
                                id={'fileProfile'}
                                name='imgUser'
                                hidden
                                accept=".jpg, .jpeg, .png" 
                                onChangeCapture={(e)=>handleFileChange(e)}
                                multiple
                            />

                            <label htmlFor={'fileProfile'}> 
                                <span className="material-icons">
                                    photo_camera
                                </span>
                            </label>

                        </div>

                    </div>
                </div>
                
            </div>
                
            <form className='form_container_profile_edit'
            onSubmit={handleSubmit}
            >

               

                <div className="edit-input">
                    <label>Name</label>
                    <input type="text"
                        placeholder="Enter your name..."
                        name="name" 
                        value={values.name}
                        onChange={
                            handleInputChange
                            }
                        />
                </div>
                <div className="edit-input">
                    <label>Bio</label>
                    <textarea placeholder="Enter you bio.."
                                rows="4"
                                name="bio" 
                                value={values.bio}
                                onChange={
                                    handleInputChange
                                    }
                    >
                        
                    </textarea>
                </div>
                <div className="edit-input">
                    <label>Email</label>
                    <input type="text"
                        placeholder="Enter your email..."
                        name="email" 
                        value={values.email}
                        onChange={
                            handleInputChange
                            }
                        />
                </div>
                <div className="edit-input">
                    <label>New Password</label>
                    <input type="password"
                        placeholder="* * * * *"
                        name="password" 
                        value={values.password}
                        onChange={
                            handleInputChange
                            }
                        />
                </div>

                <div className='btn_save_reset'>
                    <ComponentBtn type={'submit'} txtBtn='Save' median/>
                    <ComponentBtn  txtBtn='Reset' className={'grey-1 grey-1-h'} median functionBtn={()=> reset()} />
                </div>
                
            </form>

            <ToastContainer/>
        </div>
    
  )
}
