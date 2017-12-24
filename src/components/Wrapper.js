import React from 'react'
import { string} from 'prop-types';

const Wrapper = ({title, plusClass, children}) => {
  return (
    <div className={`input-section ${plusClass}`}>
      <span>{title}</span>
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  title: string.isRequired,
  plusClass: string,
};

export default Wrapper
