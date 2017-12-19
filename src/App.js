import React, { Component } from "react"
import WebFont from "webfontloader"
import C2S from "./vendor/canvas2svg"
// Named Imports
import { Button, Icon } from "semantic-ui-react"
import { debounce } from "./helpers";
// Components
import FontFamilySelect from "./components/FontFamilySelect"
import FontStyleSelect from "./components/FontStyleSelect"
import TextEdit from "./components/TextEdit"
import FontSize from "./components/FontSize"
import Colorpicker from "./components/Colorpicker"
import Dimensions from "./components/Dimensions"
// CSS imports
import "semantic-ui-css/semantic.min.css"
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World",
      color: "",
      bgcolor: "",
      fontFamily: "Berkshire Swash",
      variants: ["regular"],
      fontVariant: "regular",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 48,
      isPickerVisible: false,
      canvasW: 500,
      canvasH: 100,
      textX: 100,
      textY: 20
    }

    this._debounceTextChange = debounce(this._debounceTextChange, 400)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleBgColorChange = this.handleBgColorChange.bind(this)
    this.changeFont = this.changeFont.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadSVGFile = this.downloadSVGFile.bind(this)
    this.showSVGCode = this.showSVGCode.bind(this)
    this.handleDimensionChange = this.handleDimensionChange.bind(this)
  }

  // Private
  _renderCanvas() {
    const { text, color, bgcolor, fontSize, fontFamily, fontStyle, fontWeight, canvasW, canvasH, textX, textY } = this.state;
    const ctx = new C2S(canvasW, canvasH)
    const fixtextY = parseInt(fontSize, 10) + parseInt(textY, 10)

    if (bgcolor) {
      ctx.rect(0, 0, canvasW, canvasH);
      ctx.fillStyle = bgcolor;
      ctx.fill();
    }

    ctx.fillStyle = `${color}`
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.fillText(`${text}`, textX, fixtextY)
    // TODO add stroke

    var svg = ctx.getSvg()
    return svg
  }

  // Binded
  handleTextChange(val) {
    this._debounceTextChange(val)
  }

  _debounceTextChange(text) {
    this.setState({ text })
  }

  handleColorChange(color) {
    this.setState({ color })
  }

  handleBgColorChange(bgcolor) {
    this.setState({ bgcolor })
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
    this.svgContainer.innerHTML = ""
    this.svgContainer.appendChild(svg)
  }

  downloadSVGFile() {
    console.log("call download")
  }

  showSVGCode() {
    console.log("show showSVGCode")
  }

  handleDimensionChange(obj) {
    const canvasW = obj.canvasW || this.state.canvasW
    const canvasH = obj.canvasH || this.state.canvasH
    const textX = obj.textX || this.state.textX
    const textY = obj.textY || this.state.textY
    this.setState({
      canvasW, canvasH, textX, textY
    })
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
        <div className="svgContainer" ref={(el) => { this.svgContainer = el }}></div>

        <div className="flex-row">
          <div className="flex-row-2">
            <TextEdit onChange={this.handleTextChange} text={this.state.text} />
          </div>
          <div className="flex-row-2">
            <Colorpicker onChange={this.handleColorChange} title="Color" defaultValue="#D700EA" />
            <Colorpicker onChange={this.handleBgColorChange} title="Bg Color" />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-row-2">
            <FontFamilySelect changeFont={this.changeFont} fontFamily={this.state.fontFamily} />
          </div>
          <div className="flex-row-2">
            <FontStyleSelect variants={this.state.variants} fontVariant={this.state.fontVariant} onChange={this.changeStyle} />
            <FontSize onChange={this.handleFontSizeChange} fontSize={this.state.fontSize} />
          </div>
        </div>
        <div className="flex-row dimensions">
          <div className="flex-row-2">
            <Dimensions onChange={this.handleDimensionChange} title="Canvas Width" text={this.state.canvasW} measures="canvasW" />
            <Dimensions onChange={this.handleDimensionChange} title="Canvas Height" text={this.state.canvasH} measures="canvasH" />
          </div>
          <div className="flex-row-2">

            <Dimensions onChange={this.handleDimensionChange} title="Text X Position" text={this.state.textX} measures="textX" />
            <Dimensions onChange={this.handleDimensionChange} title="Text Y Position" text={this.state.textY} measures="textY" />
          </div>
        </div>
        <div className="flex-row download">
          <Button icon color="teal" onClick={this.showSVGCode}><Icon name="code" /></Button>
          <Button icon color="blue" onClick={this.downloadSVGFile} ><Icon name="download" /></Button>

        </div>
        <Button icon="github" />
        <Button icon="twitter" />
        <Button icon="share alternate" color="pink" />

      </div>
    );
  }
}

export default App;
