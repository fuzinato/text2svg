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
      fontFamily: 'Berkshire Swash',
      fontSize: 48,
      pickerVisible: false
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

  changeFont(fontFamilyObj) {
    WebFont.load({
      google: {
        families: [fontFamilyObj.key]
      },
      active: () => {
        this.setState({ fontFamily: fontFamilyObj.key })
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
        <Input 
          type="text"
          // icon="write"
          icon="keyboard"
          placeholder="Enter Text"
          // value={this.state.text} 
          onChange={this.handleTextChange.bind(this)} />
        {/* <ChromePicker
          color={this.state.color}
          onChangeComplete={this.handleColorChange.bind(this)}/> */}
        <Input 
          type="number"
          icon="text height"
          width= "50px"
          placeholder='Font Size'
          value={this.state.fontSize} 
          onChange={this.handleFontSizeChange.bind(this)} />
        <Button icon color="pink" onClick={this.downloadSVGFile.bind(this)} ><Icon name='tint' /></Button>
        <Button icon color="blue" onClick={this.downloadSVGFile.bind(this)} ><Icon name='download' /></Button>
        <Button icon color="teal" onClick={this.showSVGCode.bind(this)}><Icon name='code' /></Button>
        <GoogleFontApi changeFont={this.changeFont.bind(this)}/>

      </div>
    );
  }
}

export default App;
