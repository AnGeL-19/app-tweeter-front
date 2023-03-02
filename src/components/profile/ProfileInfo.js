import React from 'react'
import { ComponentBtn } from '../ComponentBtn';

export const ProfileInfo = ({ dataUser, user, setFilterFollower, setShowModal }) => {


    const handleShowModalFollowing = () => {
        setShowModal(true);
        setFilterFollower(true)
    }

    const handleShowModalFollowers = () => {
        setShowModal(true);
        setFilterFollower(false)
    }


  return (
    <div className="info_profile">

        <div className="profile_img_background">
            {
                dataUser
                && 
                (<img src={dataUser.imgUserBackground} alt={dataUser.name} />)
            }
  
        </div>
        
        <div className="container_userinfo">

            <div className="user_img_info">

                <div className="userprofile_img_info">

                    <div className="user_img">
                        <img src={dataUser.imgUser}  alt={dataUser.name}/>
                    </div>
                    <div className="user_info">
                        <div className="characteristics">
                            <div className="name_user" >
                                <span className=" gray1Color">
                                {dataUser.name}
                                </span>
                            </div>
                            <div className="div_followers">
                                <div className="fwll"
                                    onClick={() => handleShowModalFollowing()}>
                                    <span className="wBlack">
                                        {dataUser.nfollowing}
                                        {/* dataUser.following.length ||  */}
                                    </span>
                                    <span className="user_following ">
                                        Following                                    
                                    </span>
                                </div>
                                <div className="fwll"
                                    onClick={() => handleShowModalFollowers()}>
                                    <span className="wBlack">
                                        { dataUser.nfollowers}
                                        {/* dataUser.followers.length || */}
                                    </span>
                                    <span className="user_following ">
                                        Followers                                    
                                    </span>
                                </div >
                            </div>
                        </div>
                        <p className="description">
                            {dataUser.bio || 'Empty'}
                        </p>
                    </div>
                </div>

            {
                    (dataUser.uid !== user.uid)
                        &&
                    <ComponentBtn big 
                                txtBtn={user.following?.includes(dataUser.uid) ? 'Unfollow': 'Follow'}
                                addicon={user.following?.includes(dataUser.uid) ? 'person_remove': 'person_add'}

                    />         
            } 
            </div>
        </div>

        


    </div>  
  )
}
