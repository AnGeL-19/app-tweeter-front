import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchApi } from '../../helpers/fetch';
import { findHashtag, hashtagText } from '../../helpers/findHashtag';
import { UserImg } from '../basic/UserImg';
import { ComponentBtn } from '../ComponentBtn';
import { FileImage } from '../FileImage';
import { MenuImage } from './MenuImage';
import { MenuPrivacity } from './MenuPrivacity';

export const CreatePost = () => {

    const user = useSelector(state => state.user);
    const {token} = useSelector(state => state.auth);

    const [showMenuImage, setShowMenuImage] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showInputUrl, setShowInputUrl] = useState(false);
    
    const [image, setImage] = useState(null);
    const [dataURL, setURL] = useState('');

    const [values, setValues] = useState({
        description: "",
        url: "",
        privacity: 'public'
    });

    const handleEliminateImg = () => {
        console.log("eliminar");
        setImage(null);
        setValues({
            ...values,
            url: ''
        })
    }

    const handleAddUrl = (e) => {
        e.preventDefault();

        console.log(dataURL);
        setValues({
            ...values,
            url: dataURL.url
        })
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

        console.log(values);
        const hashtags = findHashtag(values.description)

        const newData = {
            description: values.description,
            img: values.url,
            privacity: values.privacity === 'public' ? true : false
        }

        if (hashtags.length !== 0) {
            newData.hashtags = hashtags;
        }

        const respData = await fetchApi(newData,'tweet','POST',token)
        const resp = await respData.json();

        console.log(resp);

        setValues({
            description: "",
            url: "",
            privacity: 'public'
        })

        handleEliminateImg()
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
                            onChange={ (e) => setValues( value => ({
                                ...value,
                                [e.target.name]: e.target.value
                            })) }                            
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
                                <ComponentBtn txtBtn="Tweet" median />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
