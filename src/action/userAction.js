import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { fetchApi, fetchGetApi } from "../helpers/fetch"

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

const userAddData = (data) => ({
    type: types.userAddData,
    payload: data
});

const userFollowUnFollowFollowing = (updateFollowing) => ({
    type: types.followUnfollowFollowing,
    payload: {
        following: updateFollowing,
        nfollowing: updateFollowing.length
    }
});
