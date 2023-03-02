import React from 'react'
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';

export const BtnSocialAction = ({user, tweet, setValuesStatus, btnSocialAction }) => {

    const {token} = useSelector(state => state.auth);

    const { doFetch } = useFetch(token);

    const handleAction = async () => {

        console.log('amonos', btnSocialAction.name);

        doFetch(btnSocialAction.url,{
            idTweet: tweet.tid
        },
        'PUT')


        if (btnSocialAction.select) {
            setValuesStatus(status => ({
                ...status,
                [btnSocialAction.name]: btnSocialAction.values.filter(idUser => idUser !== user.uid)
            }))
        }else{
            setValuesStatus(status => ({
                ...status,
                [btnSocialAction.name]: [...btnSocialAction.values, user.uid]
            }))
        }

    }

  return (
    <button
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
