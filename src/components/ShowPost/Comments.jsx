import React, { useState } from 'react'
import PropTypes from 'prop-types';

import useSWRMutation from 'swr/mutation'

import { Comment } from './Comment';
import { fetcher } from '../../helpers/fetch';
import { LoadingComponent } from '../LoadingComponent';

export const Comments = ({tid,comments,lengthComments}) => {

    const [optionPage, setOptionPage] = useState({
        page: 1,
        limit: 5
    })

    const { trigger, isMutating } = useSWRMutation(`tweet/${tid}/comments?${new URLSearchParams({...optionPage})}`, fetcher);
    const [valueComments, setValueComments] = useState(comments)

    const handleMoreComments = async () => {

        try {
            const result = await trigger({}, /* options */)

            if (result.ok) {
               
                setValueComments(prev => [
                    ...prev,
                    ...result.comments.filter(cc => valueComments.find(c => c.cid !== cc.cid))
                ])

                setOptionPage( opt => ({
                    ...opt,
                    page: opt.page + 1
                })) 
            }
            
            
        } catch (error) {
            console.log(error);
        }
       

    }


    return (
        <div className="people_comments">


            {
                (valueComments)
                    &&
                valueComments.map((comment) => (
                    <Comment key={comment.cid} comment={comment} />
                ))       
            } 


            {
                (isMutating)
                &&
                <LoadingComponent />  
            }
                  
            

            {
                (valueComments.length < lengthComments)
                    &&
                <div className="moreComments">
                    <span 
                        className='span_moreCommments'
                        onClick={handleMoreComments}
                    >More comments</span>
                </div>
                
            }

        </div>
    )
}

Comments.propTypes = {
    tid: PropTypes.string,
    comments: PropTypes.array.isRequired,
    lengthComments: PropTypes.number
}