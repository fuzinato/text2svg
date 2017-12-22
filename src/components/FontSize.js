import React from 'react'
import Wrapper from './Wrapper'

const FontSize = (props) => {

  function handleChange(e) {
    const fontSize = e.target.value || 0
    props.onChange(fontSize)
  }

  return (
    <Wrapper title="Font Size" >
      <input
        type="number"
        placeholder='Font Size'
        defaultValue={props.fontSize}
        onChange={handleChange} />
    </Wrapper>
  )
}

export default FontSize
