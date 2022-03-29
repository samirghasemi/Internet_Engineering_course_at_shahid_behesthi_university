import React from 'react';
import {validate} from './validators';

const INPUT_STATES = {
  UNTOUCHED: 'UNTOUCHED',
  VALID: 'VALID',
  INVALID: 'INVALID'
};

const Input = props => {
   return (
     <div className='form-input' data-testid="form-input">
       <label>{this.label}</label>
       <input />
       <p></p>
     </div>
   )
};

export default Input;
