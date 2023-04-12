import React from 'react'
import PropTypes from 'prop-types'

export const Input = ({type = 'text',
                        name,
                        label,
                        placeholder,
                        icon,
                        iconPosition,
                        validators,
                        valueForm,
                        setValueForm,
                        classNameInput
                    }) => {
  
    // FULL WITH
    // SEPARATE CHECKBOX AND RADIOBUTTONS

    return (
    <div className='container_input'>

        <div className={`icons_input`}>
            {
                (icon && iconPosition === 'left')
                &&
                <span className="material-icons left">
                    {icon}
                </span>
            }
                <label htmlFor="">{label}</label>
            {
                (type === 'textarea') 
                ?
                <textarea 
                    type={type} 
                    placeholder={placeholder}
                    name={name}
                    value={valueForm}
                    className={classNameInput}
                    onChange={ (e)=> setValueForm(e) }                          
                >                  
                </textarea>
                :
                <input 
                    type={type} 
                    placeholder={placeholder}
                    name={name}
                    value={valueForm}
                    className={classNameInput}
                    onChange={ (e)=> setValueForm(e)}
                />
            }
            {
                (icon && iconPosition === 'right')
                &&
                <span className="material-icons right">
                    {icon}
                </span>
            }
            
        </div>
        
        {
            validators
            &&
            <p className="notice">warning</p>
        }

    </div>
  )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValueForm: PropTypes.func
}