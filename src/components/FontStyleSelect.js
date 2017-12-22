import React from "react"
import Wrapper from './Wrapper';

const FontStyleSelect = (props) => {
  function handleChange(e) {
    props.onChange(e.target.value)
  }

  return (
    <Wrapper title="Font Style">
      <div className="selectContainer">
        <select onChange={handleChange} value={props.fontVariant}>
          {props.variants.map((item) =>
            <option key={item} value={item}>{item}</option>
          )}
        </select>
      </div>
    </Wrapper>
  )
}

export default FontStyleSelect
