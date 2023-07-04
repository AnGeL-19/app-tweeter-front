import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser,  } from '../../action/authAction';
import { ComponentBtn } from '../../components/ComponentBtn';
import { useForm } from '../../hooks/useForm';

import LogoTweeter from '../../static/tweeter.svg';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/form/Input';
import { removeError } from '../../action/errorAction';
import { useEffect } from 'react';

export const LoginPage = () => {

    const dispatch = useDispatch();
    const {messageError} = useSelector(state => state.error);
    
    const {values, handleInputChange, reset} = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (messageError.length !== 0) {
            dispatch(removeError())
        }
    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(values))
        dispatch(removeError())
        reset()   
    }

    const handleGoogle = () => {
        console.log("google");
    }

    return (
        <div>
            <div className="login_container_main">

                <div className="container_login_form">

                    <div className="logo_tweeter">
                        <img src={LogoTweeter} alt='Logo Tweeter'/>
                    </div>
                    
                    <h2 className="title_login">Login</h2>

                    {
                        (messageError.length !== 0)
                        &&
                        <p className="warnings">{messageError}</p>
                    }
                    

                    <Form onSubmit={handleSubmit}>
                        <Input 
                            type='email' 
                            name='email'
                            placeholder='Insert email...'
                            icon='email' 
                            iconPosition='left'
                            valueForm={values.email}
                            setValueForm={handleInputChange}
                        />
                        <Input 
                            type='password' 
                            name='password'
                            placeholder='Insert password...'
                            icon='lock' 
                            iconPosition='left'
                            valueForm={values.password}
                            setValueForm={handleInputChange}
                        />

                        <ComponentBtn 
                            type={'submit'} 
                            disabled={
                                (!(values.email.length > 0) || !(values.password.length > 0))
                            }
                            txtBtn={'Enter'} 
                            full
                        />
                    </Form>

                    <div className="div_text">
                        <p className="text_login">or continue with these social profile</p>
                    </div>
                    
                    <div className="container_networking">
                        <button className="network google"
                                onClick={handleGoogle}>
                            <i className="fab fa-google"></i>
                        </button>
                        <button className="network facebook"
                                >
                            <i className="fab fa-facebook"></i>
                        </button>
                        <button className="network twitter"
                                >
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button className="network github"
                                >
                            <i className="fab fa-github"></i>
                        </button>
                    </div>

                    <div className="div_text">
                        <p className="text_login">
                            "not adready a member yet"

                            <NavLink to="/auth/register" 
                                    // className="nav_item"
                                    // activeClassName="selected"
                                         >
                            <span className="txt_status">
                                Register
                            </span>  
                            </NavLink>
                            

                        </p>
                    </div>
                    

                </div>
                <span className="aviso">This application is under development, do not put real data.</span>
            </div>
        </div>
    )
}
