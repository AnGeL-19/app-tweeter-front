import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser, registerUser } from '../../action/authAction';
import { ComponentBtn } from '../../components/ComponentBtn';
import { useForm } from '../../hooks/useForm';

import LogoTweeter from '../../static/tweeter.svg';

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);

        if(values.password!==values.passwordConfirmation){
            alert('Passoword is different')
            return;
        }
        dispatch(registerUser(values))
        
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
                    
                    <span className="title_login">Register</span>

                    <form   onSubmit={handleSubmit}
                            className="inputs__icon_login">
                        
                        <div className="form_icon">
                            <input 
                            type="text" 
                            name= "name"
                            placeholder="Username" 
                            value={values.name}
                            onChange={handleInputChange}
                            required/>
                            <span className="material-icons gray3Color" >
                                person
                            </span>
                        </div>
                        
                        <div className="form_icon">
                            <input 
                            type="email" 
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            placeholder="Email" 
                            required/>
                            <span className="material-icons gray3Color" >
                                email
                            </span>
                        </div>

                        <div className="form_icon">
                            <input 
                            type="password" 
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            placeholder="Password" 
                            required />
                            <span className="material-icons gray3Color">
                                lock
                            </span>
                        </div>

                        <div className="form_icon">
                            <input 
                            type="password" 
                            name="passwordConfirmation"
                            value={values.passwordConfirmation}
                            onChange={handleInputChange}
                            placeholder="Confirm password" 
                            required />
                            <span className="material-icons gray3Color">
                                lock
                            </span>
                        </div>
                        
                        <ComponentBtn type={'submit'} className txtBtn={'Register'} full />

                    </form>

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
                            Adready a member?
                            <NavLink to="/auth/login" 
                                    // className="nav_item"
                                    // activeClassName="selected"
                                         >
                                <span className="txt_status">
                                Login
                                </span>  
                            </NavLink>

                        </p>
                    </div>
                    

                </div>

            </div>
        </div>
    )
}
