import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { Input, Button, Icon } from 'semantic-ui-react'
import WebFont from 'webfontloader'
import C2S from './vendor/canvas2svg'
import GoogleFontApi from './GoogleFontApi'
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
  
  _debounceTextChange(key){
    this.setState({ key })
  }

  handleColorChange(colorObj, event) {
    const color = colorObj.hex
    this.setState({ color })
  }

  handleFontSizeChange(e) {
    const fontSize = e.target.value || 0
    this.setState({ fontSize })
  }

  changeFont(fontFamily) {
    WebFont.load({
      google: {
        families: [fontFamily]
      },
      active: () => {
        this.setState({ fontFamily: fontFamily })
      }
    });
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
    return (
      <div>
        <div ref="svgContainer"></div>
        {/* Text input */}
        <Input 
          type="text"
          icon="keyboard"
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
        <Input 
          type="number"
          width= "50px"
          icon="text height"
          placeholder='Font Size'
          value={this.state.fontSize} 
          onChange={this.handleFontSizeChange.bind(this)} />
        <Button icon color="pink" onClick={this.showColorPicker.bind(this)} ><Icon name='tint' /></Button>
        <Button icon color="blue" onClick={this.downloadSVGFile.bind(this)} ><Icon name='download' /></Button>
        <Button icon color="teal" onClick={this.showSVGCode.bind(this)}><Icon name='code' /></Button>
        {/* Font Family and Style */}
        <GoogleFontApi 
          changeFont={this.changeFont.bind(this) }
          defaultFont={this.state.fontFamily}/>

      </div>
    );
  }
}

export default App;
