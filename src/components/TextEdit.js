import React from 'react'

const TextEdit = (props) => {
  return (
    <div className="input-section">
      <span>Text</span>
      <input
        type="text"
        placeholder="Enter Text"
        defaultValue={props.text}
        onChange={props.onChange} />
    </div>
  )
}

export default TextEdit
