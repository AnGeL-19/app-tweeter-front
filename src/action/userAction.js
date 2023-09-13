import { types } from "../types/types";

export const userData = (dataUser) => {
    return async(dispatch) => {
        dispatch(userAddData(dataUser))
    }
}

export const followUnFollowFollowing = (userId, following) => {

    return async(dispatch) => {

        try{

            if (following.includes(userId)) {
                dispatch(userFollowUnFollowFollowing( following.filter( f => f !== userId) ));
            }else{
                dispatch(userFollowUnFollowFollowing( [...following, userId] ));
            }

        }catch(err){
            console.log(err);
        }
        
    }

}

export const updateUserInfo = (userInfo) => {

    return async(dispatch) => {

        try{
            dispatch(updateUser( userInfo ));
        }catch(err){
            console.log(err);
        }
        
    }

}

const userAddData = (data) => ({
    type: types.userAddData,
    payload: data
});

const updateUser = (user) => ({
    type: types.userUpdateData,
    payload: user
});

const userFollowUnFollowFollowing = (updateFollowing) => ({
    type: types.followUnfollowFollowing,
    payload: {
        following: updateFollowing,
        nfollowing: updateFollowing.length
    }
});
