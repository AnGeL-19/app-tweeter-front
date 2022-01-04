import React, { useState } from 'react'
import { ComponentBtn } from '../ComponentBtn';
import { FileImage } from '../FileImage';

export const CreatePost = () => {

    const extensions = ["jpg","png","gif","svg"];

    const [showMenu, setShowMenu] = useState(false);

    const [image, setImage] = useState(null);

    const [values, setValues] = useState({
        txtPost: "",
    });


    const handleEliminateImg = () => {
        console.log("eliminar");
        setImage(null);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        console.log(file);
        if(file){

            
            values.photo = file;

            console.log(values.photo);

            const extension = values.photo.name.split(".");
            console.log(extension);

            const ext = extension[extension.length-1];
            console.log(ext);

            if(extensions.includes(ext.toLowerCase())){

                console.log( URL.createObjectURL(values.photo) );

                setImage( URL.createObjectURL(values.photo) );
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

        console.log(values);
    }

    return (
        <div className="div__create_post">
            <h2 className="title">Tweet something</h2>
            <div className="line"></div>
            <div className="img__inputs__post">
                <div className="img__user">
                    <img src="https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1" alt="userimg" />
                </div>
                <div className="form__img__btn">
                    <form className="txt__image__icons__btn" onSubmit={handleSubmit}>
                        <div className="div__txt">
                            <textarea id="txtTweeter" placeholder='What’s happening?'>

                            </textarea>
                        </div>

                        {
                            image
                            &&
                            <FileImage image={image} 
                            functionCmt={handleEliminateImg} />
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
                        
                        <div className="div__icons__btn">
                            <div className="div__img__privacity"> 

                                    <div className="icons_select hover_reply">
                                        <input type="file" 
                                               id="fileGallery" 
                                               hidden
                                               accept=".jpg, .jpeg, .png" 
                                               onChangeCapture={handleFileChange}
                                               multiple />
                                               
                                        <label htmlFor="fileGallery" >
                                            <span className="material-icons  primaryColor">
                                                collections
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <div className="div__menu_select">
                                        <div    onClick={() => setShowMenu(!showMenu)}
                                                className={`icons_select hover_reply ${ showMenu ? 'hover_reply_b': ''}`} >  
                                            <span className="material-icons mrg_r_7 primaryColor"  >
                                                public
                                            </span>
                                            <span className="txtIcon">Everyone can reply</span>
                                        </div>
                                        
                                        {
                                        showMenu 
                                        &&
                                        (
                                            <div className="div__menu">

                                                <div className="div__title_description">
                                                    <span className="title">Who can reply?</span>
                                                    <p className="description gray3Color">Choose who can reply to this Tweet.</p>
                                                </div>
                                                
                                                <div className="select_privacity">

                                                    <div className="privacity">
                                                        <span className="material-icons mrg_r_9 black">
                                                            public
                                                        </span>
                                                        <span className="reply">Everyone</span>
                                                    </div>
                                                    <div className="privacity">
                                                        <span className="material-icons mrg_r_9 black">
                                                            people
                                                        </span>
                                                        <span className="reply">People you follow</span>
                                                    </div>

                                                </div>

                                            </div>
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
