import React from 'react'

export const FileImage = ({image, functionCmt, small }) => {

    console.log("llega", image);

    return (
        <div className={`file_img ${small ? 'smallImg': ''}`}>

            <div className="btn_exit">
                <button onClick={functionCmt}>
                    <span className="material-icons">
                        close
                    </span>
                </button>
            </div>

            <div className="image_post_cmt">
                <img src={image} alt="userimg" />
            </div>   
        </div>
    )
}
