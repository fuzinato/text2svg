import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { Button, Icon, Input } from 'semantic-ui-react'
import WebFont from 'webfontloader'
import C2S from './vendor/canvas2svg'
import FontFamilySelect from './FontFamilySelect'
import FontStyleSelect from './FontStyleSelect'
import { debounce } from "./helpers";
import Menu from './components/Menu'
import 'semantic-ui-css/semantic.min.css'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World",
      color: "#D700EA",
      fontFamily: "Berkshire Swash",
      variants: ["regular"],
      fontVariant: "regular",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 48,
      isPickerVisible: false
    }

    this._debounceTextChange = debounce(this._debounceTextChange, 400)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.showColorPicker = this.showColorPicker.bind(this)
    this.changeFont = this.changeFont.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadSVGFile = this.downloadSVGFile.bind(this)
    this.showSVGCode = this.showSVGCode.bind(this)
  }

  // Private
  _renderCanvas() {
    const { text, color, fontSize, fontFamily, fontStyle, fontWeight } = this.state;
    const ctx = new C2S(1000, 200)

    ctx.fillStyle = `${color}`
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.fillText(`${text}`, 10, 100)

    // TODO add stroke

    var svg = ctx.getSvg()
    return svg
  }

  // Binded
  handleTextChange(e) {
    this._debounceTextChange(e.target.value)
  }

  _debounceTextChange(text) {
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

    // Change to default
    this.setState({
      fontVariant: "regular",
      fontStyle: "normal",
      fontWeight: 400
    })
  }

  getFVD(fontVariant) {
    const flags = /(\d+)?(\D+)?/g.exec(fontVariant)
    const fontWeightRgx = flags[1]
    const fontStyleRgx = flags[2]
    let fontWeight,
      fontStyle = "normal",
      fvd = "";

    if (fontWeightRgx && fontWeightRgx !== "regular") {
      fontWeight = parseInt(fontWeightRgx, 10)
    } else {
      fontWeight = "400"
    }
    fvd += fontWeight

    if (fontStyleRgx === "italic") {
      fontStyle = fontStyleRgx
      fvd += "i"
    }

    this.setState({ fontWeight, fontStyle })
    return fvd
  }

  changeStyle(fontVariant) {
    const fvd = this.getFVD(fontVariant)
    WebFont.load({
      google: {
        families: [`${this.state.fontFamily}:${fvd}`]
      }
    });
    this.setState({ fontVariant })
  }

  renderSvg() {
    const svg = this._renderCanvas()
    this.svgContainer.innerHTML = ''
    this.svgContainer.appendChild(svg)
  }

  downloadSVGFile() {
    console.log('call download')
  }

  showSVGCode() {
    console.log('show showSVGCode')
  }

  showColorPicker() {
    console.log(this.state.isPickerVisible)
    this.setState({ isPickerVisible: !this.state.isPickerVisible })
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
      <div className="app">
        <div ref={(el) => { this.svgContainer = el }}></div>
        {/* <Menu /> */}

        {/* Text input */}
        <div className="input-section">
          <span>Text</span>
          <input
            type="text"
            placeholder="Enter Text"
            defaultValue={this.state.text}
            onChange={this.handleTextChange} />
        </div>
        {/* Font Size */}

        <div className="input-section b-font-size">
          <span>Font Size</span>
          <input
            type="number"
            placeholder='Font Size'
            value={this.state.fontSize}
            onChange={this.handleFontSizeChange} />
        </div>
        <div className="input-section">
          {/* Color Picker */}
          <ChromePicker
            color={this.state.color}
            className="color-picker"
            className={this.state.isPickerVisible ? "is-visible" : "is-hidden"}
            onChangeComplete={this.handleColorChange} />
          <span>Color</span>
          <Button icon color="pink" onClick={this.showColorPicker} ><Icon name='tint' /></Button>
        </div>


        {/* Font Family */}
        <div className="input-section">
          <span>Font Family</span>
          <FontFamilySelect
            changeFont={this.changeFont}
            fontFamily={this.state.fontFamily} />
        </div>
        {/* Font Style */}
        <div className="input-section">
          <span>Font Style</span>
          <FontStyleSelect
            variants={this.state.variants}
            fontVariant={this.state.fontVariant}
            changeStyle={this.changeStyle} />
        </div>

        <div className="input-section">
          <Button icon color="blue" onClick={this.downloadSVGFile} ><Icon name='download' /></Button>
          <Button icon color="teal" onClick={this.showSVGCode}><Icon name='code' /></Button>
        </div>
        <Button icon="github" />
        <Button icon="twitter" />
        <Button icon="share alternate" color="pink" />

      </div>
    );
  }
}

export default App;
