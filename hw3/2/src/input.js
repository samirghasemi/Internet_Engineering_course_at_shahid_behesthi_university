import React, {useState} from 'react';
import {validate} from './validators';

const INPUT_STATES = {
    UNTOUCHED: 'UNTOUCHED',
    VALID: 'VALID',
    INVALID: 'INVALID'
};

const Input = ({
                   type,
                   label,
                   id,
                   validators,
                   errorText,
               }) => {

    const [state, setState] = useState(INPUT_STATES.UNTOUCHED)
    // console.log({validators,value,state})
    // console.log(validate(value , validators))
    return (
        <div className={`form-input ${state === INPUT_STATES.INVALID ? 'form-input--invalid' : ''}`}
             data-testid="form-input">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} onChange={(e) => {
                validate(e.target.value, validators) ? setState(INPUT_STATES.VALID) : setState(INPUT_STATES.INVALID);
            }} onBlur={(e) => {
                validate(e.target.value, validators) ? setState(INPUT_STATES.VALID) : setState(INPUT_STATES.INVALID);
            }}/>
            {state === INPUT_STATES.INVALID && <p>{errorText}</p>}
        </div>
    )
}
export default Input;
