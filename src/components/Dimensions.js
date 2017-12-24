import React from 'react'
import Wrapper from './Wrapper';
import { string, number, func } from 'prop-types';

const Dimensions = (props) => {
  function handleChange(e) {
    const val = e.target.value || 0
    const state = { [props.measures]: val }
    console.log(state)
    props.onChange(state)
  }
  return (
    <Wrapper title={props.title}>
      <input
        type="number"
        placeholder={props.title}
        defaultValue={props.text}
        onChange={handleChange} />
    </Wrapper>
  )
}

Dimensions.propTypes = {
  onChange: func.isRequired,
  title: string.isRequired,
  measures: string.isRequired,
  text: number,
};

export default Dimensions
