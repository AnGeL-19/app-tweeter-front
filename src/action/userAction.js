import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { fetchApi, fetchGetApi } from "../helpers/fetch"

import { types } from "../types/types";


export const followUnFollowFollowing = (userId, following) => {

    return async(dispatch) => {

        try{

            if (following.includes(userId)) {
                dispatch(userFollowUnFollowFollowing( following.filter( f => f !== userId) ));
                console.log('si esta');
                console.log(following.filter( f => f !== userId));
            }else{
                dispatch(userFollowUnFollowFollowing( [...following, userId] ));
                console.log('No esta');
                console.log([...following, userId]);
            }

        }catch(err){
            console.log(err);
        }
        
    }

}

const userFollowUnFollowFollowing = (updateFollowing) => ({
    type: types.followUnfollowFollowing,
    payload: updateFollowing
});
