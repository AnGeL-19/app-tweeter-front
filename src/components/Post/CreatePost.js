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

export const CreatePost = () => {

    const user = useSelector(state => state.user);
    const { trigger, isMutating } = useSWRMutation(`tweet`, fetcherPost)

    const [showMenuImage, setShowMenuImage] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showInputUrl, setShowInputUrl] = useState(false);
    
    const [image, setImage] = useState(null);
    const [dataURL, setURL] = useState('');

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

    const handleAddUrl = (e) => {
        e.preventDefault();

        setValues((v) => ({
            ...v,
            url: dataURL.url
        }))
        setImage(dataURL.url);
        setShowInputUrl(false);

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
                img: values.url,
                privacity: values.privacity === 'public' ? true : false
            }
    
            if (hashtags.length !== 0) {
                newData.hashtags = hashtags;
            }
    

            const result = await trigger({}, /* options */)

            if (!result.ok) throw new Error('Error', result)

            // dispatch(followUnFollowFollowing(user.uid, usersF.following))
            reset()

            handleEliminateImg()

            console.log(result);


          } catch (e) {
            console.log(e);
          }
     
        // doFetch('tweet',newData,'POST')

        
    }

    return (
        <div className="div__create_post">
            <h2 className="title">Tweet something</h2>
            <div className="line"></div>

            
            <div className="img__inputs__post">

                <UserImg url={user.imgUser}/>

                <div className="form__img__btn">
                    <form className="txt__image__icons__btn" onSubmit={handleSubmit}>
                        <div className="div__txt">
                            <textarea id="txtTweeter" 
                                placeholder='What’s happening?'
                                name='description'
                                value={values.description}
                                onChange={ (e) => handleInputChange(e) }                            
                            >                  
                            </textarea>
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
                            <div className="div_add_url mrg_b_9">
                                <input 
                                className='input_basic mrg_r_7' 
                                type="text" 
                                name='url'
                                onChange={(e) => setURL({
                                    [e.target.name]: e.target.value
                                }) }
                                placeholder='Insert URL...'
                                 />
                                <ComponentBtn txtBtn="Add" median functionBtn={handleAddUrl} />
                            </div>
                            )
                            
                        }
                        
                        <div className="div__icons__btn">
                            <div className="div__img__privacity"> 

                            {/* hacer componente de opciones de posts */}
                                    <div className="div__menu_select">
                                        {/* <div className="icons_select hover_reply"> */}

                                            {/* <div onClick={() => setShowMenuImage(!showMenuImage)} >
                                                
                                            </div> */}
                                            <div onClick={() => handleShowMenuImage()}
                                                className={`icons_select hover_reply ${ showMenuImage ? 'hover_reply_b': ''}`} >  
                                            <span className="material-icons  primaryColor">
                                                    collections
                                            </span>

                                            </div>
                                            {
                                                showMenuImage
                                                &&
                                                (
                                                    <MenuImage values={values} 
                                                                setImage={setImage} 
                                                                showMenuImage={setShowMenuImage}
                                                                showInputUrl={setShowInputUrl}
                                                                showMenu={setShowMenu}
                                                    />
                                                )
                                            }
                                        {/* </div> */}
                                    </div>
                                    <div className="div__menu_select">
                                        <div    onClick={() => handleShowMenuPrivacity()}
                                                className={`icons_select hover_reply ${ showMenu ? 'hover_reply_b': ''}`} >  
                                            <span className="material-icons mrg_r_7 primaryColor"  >
                                                {values.privacity}
                                            </span>
                                            <span className="txtIcon">{values.privacity} can reply</span>
                                        </div>
                                        
                                        {
                                        showMenu
                                        &&
                                        (
                                            <MenuPrivacity setValue={setValues}
                                                            showPrivacity={setShowMenu}
                                                            showMenuImage={setShowMenuImage}
                                            />
                                        )
                                        }

                                    </div>
                                    

                            </div>
                            <div className="btn__right">
                                <ComponentBtn type={'submit'} txtBtn="Tweet" median />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
