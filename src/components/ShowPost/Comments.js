import React from 'react'

export const Comments = () => {

    const user = {
        img: 'https://th.bing.com/th/id/OIP.ia3f6X2LTEwPjGX6Pdmk4gHaHa?pid=ImgDet&rs=1',
        name: 'Mikael Stanley',
        other: '24 August at 20:43 ',
    }

    return (
        
        <div className="user_comment">

            <div className="img_user">
                <img src={user.img} alt={user.name}/>
            </div>
            <div className="comment_likes">
                <div className="info_comment">
                    <div className="info_user">
                        <span className="name_user">
                            Waqar Bloom
                        </span>
                        <span className="date_comment">
                            24 August at 20:43 
                        </span>
                    </div>
                    <p className="comment">
                        I’ve seen awe-inspiring things that I thought 
                        I’d never be able to explain to another person.
                    </p>
                </div>
                <div className="cont_likes">

                    <div className="like">
                        <span className="material-icons">
                            favorite_border
                        </span>
                        <span className="txtlike">Liked</span>
                    </div>
                    
                    <span className="txtCont">
                        12k Likes
                    </span>
                </div>
            </div>

        </div>
  
    )
}
