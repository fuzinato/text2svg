import React from 'react'
import 'whatwg-fetch'


class FontStyleSelect extends React.Component{
  handleChange(e) {
    this.props.changeStyle(e.target.value)
  }

  render(){
    return(
        <select onChange={this.handleChange.bind(this)} value={this.props.fontStyle}>
          {this.props.variants.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
    )
  }
}

export default FontStyleSelect