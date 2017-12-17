import React from 'react'

const FontSize = (props) => {

  function handleChange(e) {
    const fontSize = e.target.value || 0
    props.onChange(fontSize)
  }

  return (
    <div className="input-section b-font-size">
      <span>Font Size</span>
      <input
        type="number"
        placeholder='Font Size'
        defaultValue={props.fontSize}
        onChange={handleChange} />
    </div>
  )
}

export default FontSize
