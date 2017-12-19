import React from "react"

const FontStyleSelect = (props) => {
  function handleChange(e) {
    props.onChange(e.target.value)
  }

  return (
    <div className="input-section">
      <span>Font Style</span>
      <select onChange={handleChange} value={props.fontVariant}>
        {props.variants.map((item) =>
          <option key={item} value={item}>{item}</option>
        )}
      </select>
    </div>
  )
}

export default FontStyleSelect
