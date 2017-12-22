import React from 'react'

const Wrapper = (props) => {
  return (
    <div className={`input-section ${props.plusClass}`}>
      <span>{props.title}</span>
      {props.children}
    </div>
  )
}

export default Wrapper
