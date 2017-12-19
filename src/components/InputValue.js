import React from 'react'

const InputValue = (props) => {
  function handleChange(e) {
    const state ={[props.measures]: e.target.value}
    props.onChange(state)
  }
  return (
    <div className="input-section">
      <span>{props.title}</span>
      <input
        type="number"
        placeholder={props.title}
        defaultValue={props.text}
        onChange={handleChange} />
    </div>
  )
}

export default InputValue
