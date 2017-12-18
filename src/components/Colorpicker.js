import React, { Component } from 'react'
import { ChromePicker } from 'react-color'


export default class Colorpicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPickerVisible: false,
      color: '#D700EA'
    }

    this.showColorPicker = this.showColorPicker.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleChange(colorObj, event) {
    const color = colorObj.hex
    this.setState({ color })
    this.props.onChange(color)
  }

  showColorPicker() {
    const isPickerVisible = !this.state.isPickerVisible
    this.setState({ isPickerVisible })
  }

  handleKeyDown(e){
    if(e.keyCode === 27) {
      this.setState({isPickerVisible: false})
    }
  }

  componentDidMount() {
    console.log(this.state.color)
    this.props.onChange(this.state.color)
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  render() {
    return (
      <div className="input-section">
        <ChromePicker
          color={this.state.color}
          className={this.state.isPickerVisible ? "is-visible" : "is-hidden"}
          onChangeComplete={this.handleChange}  />
        <span>Color</span>
        <div style={{backgroundColor: this.state.color}} className="colorblock" onClick={this.showColorPicker} ></div>
      </div>
    )
  }
}

