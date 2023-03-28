import React from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom';
import { fetcher } from '../../helpers/fetch';
import { LoadingComponent } from '../LoadingComponent';
import { NotDataComponent } from '../NotDataComponent';
import { ItemUserModal } from './ItemUserModal'

export const ModalFollow = ({userName, isFollowers}) => {


    const param = useParams();

    console.log(!isFollowers ? 
        `user/followers/${param.id}`:
        `user/following/${param.id}`);

    const { data: usersF, isLoading } = useSWR(!isFollowers ? 
                                                        `user/followers/${param.id}`:
                                                        `user/following/${param.id}`, 
                                                        fetcher)

    console.log(usersF);
                                                        
    return (
     
        <>
            <div className="div_name_user">
                <span className="name_user_following">{userName} is {isFollowers ? 'Following':'Followers'}</span>
            </div>
            <div className="users_followers">

                {
                    
                        (isLoading)
                        ? <LoadingComponent />
                        :
                            (!usersF || usersF.data.length === 0) 
                            ? <NotDataComponent text={'No Followers'} />
                            : 
                            usersF.data.map((userf,index) => (
                                <>
                                    <div className="line"></div>
                                    <ItemUserModal key={userf.uid+index} user={userf}  />
                                </>
                            ))

                }
                
            </div>                
        </>

    )
}
