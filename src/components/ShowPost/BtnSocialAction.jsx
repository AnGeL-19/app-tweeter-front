import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcherPut } from '../../helpers/fetch';

export const BtnSocialAction = ({user, tweet, setValuesStatus, btnSocialAction }) => {


    const { trigger, isMutating } = useSWRMutation(`${btnSocialAction.url}`, fetcherPut)

    const handleAction = async () => {

        
        const result = await trigger({
            idTweet: tweet.tid
        }, /* options */)
        console.log(result);

        if (!result.ok) throw new Error('Error', result)

        if (btnSocialAction.select) {
            setValuesStatus(status => ({
                ...status,
                [btnSocialAction.nCount]: btnSocialAction.values.length-1,
                [btnSocialAction.name]: btnSocialAction.values.filter(idUser => idUser !== user.uid)
            }))
        }else{
            setValuesStatus(status => ({
                ...status,
                [btnSocialAction.nCount]: btnSocialAction.values.length+1,
                [btnSocialAction.name]: [...btnSocialAction.values, user.uid]
            }))
        }

    }

  return (
    <button
        disabled={isMutating}
        onClick={handleAction} 
        className={`${btnSocialAction.class} btn-icon btn__social_action ${
            btnSocialAction.select ? btnSocialAction.classSelect: ''
        }`}>
            <span className="material-icons">
                {btnSocialAction.icon}
            </span>
            <span className="textSocial">
                {btnSocialAction.select ? btnSocialAction.textSelect: btnSocialAction.text}
            </span>
    </button>
  )
}
