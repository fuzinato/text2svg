import React from 'react'

const Dimensions = (props) => {
  function handleChange(e) {
    const val = e.target.value || 0
    const state = { [props.measures]: val }
    console.log(state)
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

export default Dimensions
