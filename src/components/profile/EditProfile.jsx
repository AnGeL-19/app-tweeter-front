import React from 'react'
import useSWRMutation from 'swr/mutation'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../action/userAction';
import { fetcherPut } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { ComponentBtn } from '../ComponentBtn'
import { ToastContainer, toast } from 'react-toastify';

export const EditProfile = () => {

    // const extensions = ["jpg","png","gif","svg"];
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const { trigger, isMutating } = useSWRMutation(`user/edit`, fetcherPut)

    const { values, handleInputChange, reset } = useForm({
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
            // console.log(rest,"------");
            if ((password.trim().length > 0)) objUser.password = password

            console.log(objUser);

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

            console.log(result);
            dispatch(updateUserInfo(values))

        } catch (error) {
            console.log(error);
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
        
        
        // console.log(values);

        // reset()
    }

  return (

        <div className="edit-container">
            
            <div className="container_imgs_profile">

                <div className="div_img_background">

                    <div className="img_background">
                        <img className="imgBack" 
                            src={values.imgUserBackground} 
                            alt={values.name} />
                    </div>

                </div>

                <div className="div_img_profile">
                    <div className="img_profile">

                        <img className="imgProfile" 
                        src={values.imgUser} 
                        alt={values.name}/>

                    </div>
                {/* <div>
                    <label htmlFor="file">CHANGE PHOTO</label>
                    <input  id="file" 
                            type="file" 
                            accept="image/jpeg, image/png, .svg, .gif, .jpg, .png"
                            name="photo"
                            // onChange={handleFileChange}
                            // hidden={true}
                            />
                </div> */}

                </div>

            </div>
                
            <form className='form_container_profile_edit'
            onSubmit={handleSubmit}
            >
                <div className="edit-input">
                    <label>Background Image</label>
                    <input type="text"
                        placeholder="Url..."
                        name="imgUserBackground" 
                        value={values.imgUserBackground}
                        onChange={
                            handleInputChange
                            }
                        />
                    {/* <ComponentBtn  
                        functionBtn={() => setValues(prev => ({
                            ...prev,
                            imgUserBackground: values.imgUserBackground
                        }))}
                        className={'green-1 green-1-h mrg_t_9'} 
                        txtBtn='Preview' 
                        normal/> */}
                </div>
                <div className="edit-input">
                    <label>Profile Image</label>
                    <input type="text"
                        placeholder="Url..."
                        name="imgUser" 
                        value={values.imgUser}
                        onChange={
                            handleInputChange
                            }
                        />
                    {/* <ComponentBtn  
                        functionBtn={() => setValues(prev => ({
                            ...prev,
                            imgUser: values.imgUser
                        }))}
                        className={'green-1 green-1-h mrg_t_9'} 
                        txtBtn='Preview' 
                        normal/> */}
                </div>
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
