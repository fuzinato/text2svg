import React from 'react'
import Wrapper from './Wrapper';

const TextEdit = (props) => {
  function handleChange(e) {
    props.onChange(e.target.value)
  }
  return (
    <Wrapper title="Text" plusClass="section-edit flex-row-2">
      <input
        type="text"
        placeholder="Enter Text"
        defaultValue={props.text}
        onChange={handleChange} />
    </Wrapper>
  )
}

export default TextEdit
