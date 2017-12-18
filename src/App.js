import React, { Component } from 'react'
import WebFont from 'webfontloader'
import C2S from './vendor/canvas2svg'
// Named Imports
import { Button, Icon } from 'semantic-ui-react'
import { debounce } from "./helpers";
// COmponents
import FontFamilySelect from './components/FontFamilySelect'
import FontStyleSelect from './components/FontStyleSelect'
import TextEdit from './components/TextEdit'
import FontSize from './components/FontSize'
import Colorpicker from './components/Colorpicker'
// CSS imports
import 'semantic-ui-css/semantic.min.css'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Hello World',
      color: '',
      fontFamily: 'Berkshire Swash',
      variants: ['regular'],
      fontVariant: 'regular',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 48,
      isPickerVisible: false
    }

    this._debounceTextChange = debounce(this._debounceTextChange, 400)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
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

  handleColorChange(color) {
    this.setState({ color })
  }

  handleFontSizeChange(fontSize) {
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

  // Lifecycle hooks
  componentDidUpdate() {
    this.renderSvg();
  }

  componentDidMount() {
    this.renderSvg()
  }

  render() {
    return (
      <div className="app">
        <div ref={(el) => { this.svgContainer = el }}></div>

        <div className="flex-row">
          <TextEdit onChange={this.handleTextChange} text={this.state.text} />
          <FontSize onChange={this.handleFontSizeChange} fontSize={this.state.fontSize} />
          <Colorpicker onChange={this.handleColorChange} />
        </div>
        <div className="flex-row">
          <FontFamilySelect changeFont={this.changeFont} fontFamily={this.state.fontFamily} />
          <FontStyleSelect variants={this.state.variants} fontVariant={this.state.fontVariant} onChange={this.changeStyle} />

          <div className="input-section section__download">
            <Button icon color="teal" onClick={this.showSVGCode}><Icon name='code' /></Button>
            <Button icon color="blue" onClick={this.downloadSVGFile} ><Icon name='download' /></Button>
          </div>
        </div>
        <div className="flex-row">
        {/* canvas: width, height
        text-position: x, y */}
        </div>
        <Button icon="github" />
        <Button icon="twitter" />
        <Button icon="share alternate" color="pink" />

      </div>
    );
  }
}

export default App;
