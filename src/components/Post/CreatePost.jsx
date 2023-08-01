import React, { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useSelector } from 'react-redux';
import { fetcherPost } from '../../helpers/fetch';
import { findHashtag } from '../../helpers/findHashtag';
import { useForm } from '../../hooks/useForm';
import { UserImg } from '../basic/UserImg';
import { ComponentBtn } from '../ComponentBtn';
import { FileImage } from '../FileImage';
import { MenuImage } from './MenuImage';
import { MenuPrivacity } from './MenuPrivacity';
import { Form } from '../form/Form';
import { Input } from '../form/Input';


export const CreatePost = () => {

    const user = useSelector(state => state.user);
    const { trigger } = useSWRMutation(`tweet/`, fetcherPost)

    const [showInputUrl, setShowInputUrl] = useState(false);
    const [image, setImage] = useState(null);
    const [showMenuImage, setShowMenuImage] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const {values, setValues, handleInputChange, reset} = useForm({
        description: "",
        url: "",
        privacity: 'public'
    });

    const handleEliminateImg = () => {

        setImage(null);
        setValues((v) => ({
            ...v,
            url: ''
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

    const handleAddUrl = (e) => {
        e.preventDefault();

        setImage(values.url);
        setShowInputUrl(false);

    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {

            const hashtags = findHashtag(values.description)

            const newData = {
                description: values.description,
                img: values.url,
                privacity: values.privacity === 'public' ? true : false
            }
    
            if (hashtags.length !== 0) {
                newData.hashtags = hashtags;
            }

            console.log(newData);
            const result = await trigger(newData, /* options */)
            if (result.ok) {
                reset()

                handleEliminateImg()
            }else {
                console.log(result);
            }

            
          } catch (e) {
            console.log(e);
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
                            image
                            &&
                            <FileImage image={image} 
                                        functionCmt={handleEliminateImg} />
                        }

                        {
                            showInputUrl
                            &&
                            (
                            <div className="div_add_url mrg_b_9 mrg_r_9">
                                <Input 
                                    type="text"
                                    placeholder='Insert URL...'
                                    name='url'
                                    classNameInput={'txtTweeter'}
                                    valueForm={values.url}
                                    setValueForm={ handleInputChange } 
                                />

                                <ComponentBtn txtBtn="Add" 
                                    disabled={ !(values.url.length > 0) } 
                                    median 
                                    functionBtn={handleAddUrl} 
                                />
                            </div>
                            )
                            
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
                                                showInputUrl={setShowInputUrl}
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
                            
                            <ComponentBtn 
                                txtBtn={'Tweet'}
                                median
                                disabled={ values.description.length < 2 } 
                                type={'submit'} 
                            />

                        </div>

                        

                    </Form>
                    
                </div>
            </div>
        </div>
    )
}
