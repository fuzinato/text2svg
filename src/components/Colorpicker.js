import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { findAncestor } from "../helpers";
import Wrapper from './Wrapper';


export default class Colorpicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPickerVisible: false,
      color: props.defaultValue || ''
    }

    this.showColorPicker = this.showColorPicker.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.closePanel = this.closePanel.bind(this)
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

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.setState({ isPickerVisible: false })
    }
  }

  closePanel(e) {
    const parent = findAncestor(e.target, "colorpicker")
    if(!parent) {
      this.setState({isPickerVisible: false})
    }
  }

  componentDidMount() {
    this.props.onChange(this.state.color)
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("click", this.closePanel, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener("click", this.closePanel, false);
  }

  render() {
    return (
      <Wrapper title={this.props.title} plusClass="colorpicker">
        <ChromePicker
          color={this.state.color}
          className={this.state.isPickerVisible ? "is-visible" : "is-hidden"}
          onChangeComplete={this.handleChange} />
        <div 
        style={{ backgroundColor: this.state.color }} 
        className={`colorblock ${this.state.color ? "is-colored" : "is-empty"}`}
        onClick={this.showColorPicker}></div>
      </Wrapper>
    )
  }
}

