import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { Input, Button, Icon, Dropdown } from 'semantic-ui-react'
import WebFont from 'webfontloader'
import C2S from './vendor/canvas2svg'
import FontFamilySelect from './FontFamilySelect'
import FontStyleSelect from './FontStyleSelect'
import 'semantic-ui-css/semantic.min.css'
import { debounce } from "./helpers";

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World",
      color: "#D700EA",
      fontFamily: "Berkshire Swash",
      variants: ["regular"],
      fontStyle: "regular",
      fontSize: 48,
      isPickerVisible: false
    }
    
    this._debounceTextChange = debounce(this._debounceTextChange, 400);
  }

  // Private
  _renderCanvas() {
    const { text, color, fontSize, fontFamily } = this.state;
    const ctx = new C2S(1000, 200)
    ctx.fillStyle = `${color}`
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.fillText(`${text}`, 10, 100)

    var svg = ctx.getSvg()
    return svg
  }

  // Binded
  handleTextChange(e) {
    this._debounceTextChange(e.target.value)
  }
  
  _debounceTextChange(text){
    this.setState({ text })
  }

  handleColorChange(colorObj, event) {
    const color = colorObj.hex
    this.setState({ color })
  }

  handleFontSizeChange(e) {
    const fontSize = e.target.value || 0
    this.setState({ fontSize })
  }

  changeFont(fontFamily, variants) {
    WebFont.load({
      google: {
        families: [fontFamily]
      },
      active: () => {
        this.setState({ fontFamily, variants })
      }
    });
  }

  changeStyle(fontStyle) {
    this.setState({ fontStyle })
  }

  renderSvg() {
    const svg = this._renderCanvas()
    this.refs.svgContainer.innerHTML = ''
    this.refs.svgContainer.appendChild(svg)
  }

  downloadSVGFile() {
    console.log('call download')
  }

  showSVGCode() {
    console.log('show showSVGCode')
  }

  showColorPicker() {
    console.log(this.state.isPickerVisible)
    this.setState({isPickerVisible: !this.state.isPickerVisible})
  }

  // Lifecycle hooks
  componentDidUpdate() {
    this.renderSvg();
  }

  componentDidMount() {
    this.renderSvg()
  }

  render() {

    const variantsOpts = this.state.variants.map((variant) => {
      return { text: variant, value: variant }
    });
    return (
      <div>
        <div ref="svgContainer"></div>
        {/* Text input */}
        <input 
          type="text"
          placeholder="Enter Text"
          defaultValue={this.state.text}
          onChange={this.handleTextChange.bind(this)} />
        {/* Color Picker */}
        <ChromePicker
          color={this.state.color}
          className="color-picker"
          className={this.state.isPickerVisible ? "is-visible" : "is-hidden"}
          onChangeComplete={this.handleColorChange.bind(this)}/> 
        {/* Font Size */}
        <input 
          type="number"
          placeholder='Font Size'
          value={this.state.fontSize} 
          onChange={this.handleFontSizeChange.bind(this)} />
        <Button icon color="pink" onClick={this.showColorPicker.bind(this)} ><Icon name='tint' /></Button>
        <Button icon color="blue" onClick={this.downloadSVGFile.bind(this)} ><Icon name='download' /></Button>
        <Button icon color="teal" onClick={this.showSVGCode.bind(this)}><Icon name='code' /></Button>
        {/* Font Family */}
        <FontFamilySelect 
          changeFont={this.changeFont.bind(this)}
          fontFamily={this.state.fontFamily}/>
        {/* Font Style */}
        <FontStyleSelect
          variants={this.state.variants}
          fontStyle={this.state.fontStyle}
          changeStyle={this.changeStyle.bind(this)}/>

      </div>
    );
  }
}

export default App;
