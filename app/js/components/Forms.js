import React from 'react';

function noop() {}

export const TextInput = (props) => (
  <div className="input-field">
    <input id="first_name" type="text" onChange={props.onChange || noop}
      className="validate" defaultValue={props.value} />
    <label htmlFor="first_name">{props.label}</label>
  </div>
)
