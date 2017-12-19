import React from 'react'

const TextEdit = (props) => {
  function handleChange(e){
    props.onChange(e.target.value)
  }
  return (
    <div className="input-section input__edit">
      <span>Text</span>
      <input
        type="text"
        placeholder="Enter Text"
        defaultValue={props.text}
        onChange={handleChange} />
    </div>
  )
}

export default TextEdit
