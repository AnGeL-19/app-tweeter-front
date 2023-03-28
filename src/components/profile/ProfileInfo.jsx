import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useSWRMutation from 'swr/mutation'
import { followUnFollowFollowing } from '../../action/userAction';
import { fetcherPut } from '../../helpers/fetch';
import { ComponentBtn } from '../ComponentBtn';

export const ProfileInfo = ({ dataUser, user, setFilterFollower, setShowModal , setShowModalEdit}) => {

    // const usersF = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { trigger, isMutating } = useSWRMutation(`user/followUnfollow/${dataUser.uid}`, fetcherPut)
    
    const [follow, setFollow] = useState(user.following)

    const handleShowModalFollowing = () => {
        setShowModal(true);
        setFilterFollower(true)
    }

    const handleShowModalFollowers = () => {
        setShowModal(true);
        setFilterFollower(false)
    }



    const followUnFollow = async() => {

        try {

            const result = await trigger({}, /* options */)

            if (!result.ok) throw new Error('Error', result)

            dispatch(followUnFollowFollowing(dataUser.uid, user.following))

            console.log(result);
            if (follow.includes(user.uid)) {
                setFollow( follow.filter( f => f !== dataUser.uid ) )
            }else{
                setFollow([...follow, dataUser.uid])
            }

          } catch (e) {
            console.log(e);
          }
  
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
                    ?
                    <ComponentBtn 
                                functionBtn={followUnFollow}
                                disabled={isMutating}
                                big 
                                txtBtn={`${(follow.includes(dataUser.uid)) ? 'Unfollow': 'Follow'}`}
                                addicon={(follow.includes(dataUser.uid)) ? 'person_remove': 'person_add'}

                    />    
                    :
                    <ComponentBtn 
                                functionBtn={() => setShowModalEdit(pre => !pre)}
                                disabled={isMutating}
                                big 
                                txtBtn={`Edit profile`}
                                addicon={'edit'}

                    />       
            } 
            </div>
        </div>

        


    </div>  
  )
}
