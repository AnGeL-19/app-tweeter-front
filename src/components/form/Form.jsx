import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from './Input'
import { ComponentBtn } from '../ComponentBtn'

export const Form = ({children, formInputs, values, onSubmit, btnSubmit}) => {

    // const [valuesForm, setValuesForm] = useState(values)

    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     onSubmit(valuesForm)
        
    // }

  return (
    <form onSubmit={onSubmit}>
        

        {/* {
            formInputs
            &&
            formInputs.map((valueI,i) => (
                <Input
                    key={valueI.name} 
                    type={valueI.type}
                    name={valueI.name}
                    icon={valueI.icon}
                    label={valueI.label}
                    placeholder={valueI.placeholder}
                    setValueForm={setValuesForm}
                />
            ))
        } */}

            {children}

        {/* {
            btnSubmit
            &&
            <ComponentBtn 
                type={'submit'} 
                // disabled={}
                functionBtn={handleSubmit}
                className 
                txtBtn={'Save'} 
                full 
            />
        } */}
        
    </form>
  )
}


// Form.prototype = {

//     children: PropTypes.node,
//     formInputs: PropTypes.array,
//     values: PropTypes.object,
//     onSubmit: PropTypes.func

// }


