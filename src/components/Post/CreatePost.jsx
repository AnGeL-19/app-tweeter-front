import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useSelector } from 'react-redux';
import { fetcherFile, fetcherPost } from '../../helpers/fetch';
import { findHashtag } from '../../helpers/findHashtag';
import { useForm } from '../../hooks/useForm';
import { UserImg } from '../basic/UserImg';
import { ComponentBtn } from '../ComponentBtn';
import { FileImage } from '../FileImage';
import { MenuImage } from './MenuImage';
import { MenuPrivacity } from './MenuPrivacity';
import { Form } from '../form/Form';
import { Input } from '../form/Input';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingComponent } from '../LoadingComponent';


export const CreatePost = () => {

    const user = useSelector(state => state.user);
    const { trigger, isMutating } = useSWRMutation(`tweet/`, fetcherPost)
    const { trigger: triggerFile } = useSWRMutation(`upload/image`, fetcherFile)
    
    const [image, setImage] = useState({
        url: '',
        dataImage: null
    });
    const [showMenuImage, setShowMenuImage] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const {values, setValues, handleInputChange, reset} = useForm({
        description: "",
        privacity: 'public'
    });

    const handleEliminateImg = () => {

        setImage({
            url: '',
            dataImage: null
        });
        setValues((v) => ({
            ...v,
        }))

    }

    const handleShowMenuPrivacity = () => {
        setShowMenuImage(false)
        setShowMenu(!showMenu);
             
    }

    const handleShowMenuImage = () => {
        setShowMenu(false) 
        setShowMenuImage(!showMenuImage)    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();


        try {

            const hashtags = findHashtag(values.description)
  
            const newData = {
                description: values.description,
                privacity: values.privacity === 'public' ? true : false
            }
    
            if (hashtags.length !== 0) {
                newData.hashtags = hashtags;
            }
    

            if (image.dataImage) {
                const formdata = new FormData();
                formdata.append("fileImage", image.dataImage, image.url);

                const resultFile = await triggerFile(formdata, /* options */)

                console.log(resultFile);
                if (resultFile.ok) {
                    newData.img = resultFile.url
                }
            }


            console.log(newData);
            const result = await trigger(newData, /* options */)

            if (result.ok) {
                reset()

                handleEliminateImg()
                console.log('si jalo', result.tweet);
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
            }else {
                console.log(result);
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

            
          } catch (e) {
            console.log(e);
            toast.warning('Error when creating a tweet',{
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
        <div className="div__create_post">
            <h2 className="title">Tweet something</h2>
            <div className="line"></div>

            
            <div className="img__inputs__post">

                <UserImg url={user.imgUser}/>

                <div className="form__img__btn">
                    <Form 
                        className={'txt__image__icons__btn'}
                        onSubmit={handleSubmit}>
                        <div className="div__txt">
                            <Input 
                                type='textarea' 
                                name='description'
                                placeholder='What’s happening?'
                                valueForm={values.description}
                                setValueForm={handleInputChange}
                            />
                        </div>

                        {
                            image.url
                            &&
                            <FileImage image={image.url} 
                                        functionCmt={handleEliminateImg} />
                        }


                        <div className="div__icons__btn">
                            <div className="div__img__privacity">

                            <div className="div__menu_select">

                                <div onClick={() => handleShowMenuImage()}
                                        className={`icons_select hover_reply ${ showMenuImage ? 'hover_reply_b': ''}`} >  
                                    <span className="material-icons primaryColor">
                                            collections
                                    </span>

                                    </div>
                                    {
                                        showMenuImage
                                        &&
                                        (
                                            <MenuImage 
                                                values={values} 
                                                setImage={setImage}
                                                showMenuImage={setShowMenuImage}
                                            />
                                        )
                                    }
                                </div>
                                
                                <div className="div__menu_select">
                                    <div
                                        onClick={() => handleShowMenuPrivacity()}
                                        className={`icons_select hover_reply ${
                                            showMenu ? "hover_reply_b" : ""
                                        }`}
                                        >
                                        <span className="material-icons mrg_r_7 primaryColor">
                                            {values.privacity}
                                        </span>
                                        <span className="txtIcon">{values.privacity} can reply</span>
                                        </div>

                                        {showMenu && (
                                        <MenuPrivacity
                                            setValue={setValues}
                                            showPrivacity={setShowMenu}
                                        />
                                        )}
                                </div>

                            </div>
                            
                            {
                                isMutating
                                ?   <LoadingComponent  />
                                :
                                    <ComponentBtn 
                                        txtBtn={'Tweet'}
                                        median
                                        disabled={ (values.description.length < 2 && !image.url) } 
                                        type={'submit'} 
                                    />
                            }
                            

                        </div>

                        

                    </Form>
                    
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
