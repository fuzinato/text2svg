import React, { Component } from "react"
import WebFont from "webfontloader"
import C2S from "./vendor/canvas2svg"
// Named Imports
import { debounce } from "./helpers";
// Components
import FontFamilySelect from "./components/FontFamilySelect"
import FontStyleSelect from "./components/FontStyleSelect"
import TextEdit from "./components/TextEdit"
import FontSize from "./components/FontSize"
import Colorpicker from "./components/Colorpicker"
import Dimensions from "./components/Dimensions"
import Credits from './components/Credits'
import DownloadCode from './components/DownloadCode'
// CSS imports
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World",
      fill: "",
      bgcolor: "",
      fontFamily: "Berkshire Swash",
      variants: ["regular"],
      files: {},
      fontUrl: "http://fonts.gstatic.com/s/berkshireswash/v6/4RZJjVRPjYnC2939hKCAimKfbtsIjCZP_edQljX9gR0.ttf",
      fontVariant: "regular",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 48,
      isPickerVisible: false,
      width: 500,
      height: 100,
      x: 100,
      y: 20
    }

    this._debounceTextChange = debounce(this._debounceTextChange, 400)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleBgColorChange = this.handleBgColorChange.bind(this)
    this.changeFont = this.changeFont.bind(this)
    this.changeVariant = this.changeVariant.bind(this)
    this.downloadSVGFile = this.downloadSVGFile.bind(this)
    this.showSVGCode = this.showSVGCode.bind(this)
    this.handleDimensionChange = this.handleDimensionChange.bind(this)
  }

  // Private
  _renderCanvas() {
    const { text, fill, bgcolor, fontSize, fontFamily, fontStyle, fontWeight, width, height, x, y } = this.state;
    const ctx = new C2S(width, height)
    const fixtextY = parseInt(fontSize, 10) + parseInt(y, 10)

    if (bgcolor) {
      ctx.rect(0, 0, width, height);
      ctx.fillStyle = bgcolor;
      ctx.fill();
    }

    ctx.fillStyle = `${fill}`
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.fillText(`${text}`, x, fixtextY)
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

  handleColorChange(fill) {
    this.setState({ fill })
  }

  handleBgColorChange(bgcolor) {
    this.setState({ bgcolor })
  }

  handleFontSizeChange(fontSize) {
    this.setState({ fontSize })
  }

  changeFont(fontFamily, variants, files) {
    if (!fontFamily || !variants || !files) {
      return;
    }

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
      fontWeight: 400,
      fontUrl: files["regular"],
      files
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

  changeVariant(fontVariant) {
    const fvd = this.getFVD(fontVariant)
    WebFont.load({
      google: {
        families: [`${this.state.fontFamily}:${fvd}`]
      }
    });
    const fontUrl = this.state.files[fontVariant]
    this.setState({ fontVariant, fontUrl })
  }

  renderSvg() {
    const svg = this._renderCanvas()
    this.svgContainer.innerHTML = ""
    this.svgContainer.appendChild(svg)
  }

  getQueryString(endpoint) {
    const stateData = this.state;
    console.log(stateData)
    let queryString = "";
    for (let dataKey in stateData) {
      console.log(dataKey, stateData[dataKey])
      const value = stateData[dataKey];
      queryString += ((queryString.length ? "&" : "") + dataKey + "=" + encodeURIComponent(value));
    }
    return `http://text2svg.herokuapp.com/${endpoint}?${queryString}`;
  }
  downloadSVGFile() {

    const queryString = this.getQueryString("download")
    window.open(queryString)
  }

  showSVGCode() {
    const queryString = this.getQueryString("code")
    window.open(queryString)
  }

  handleDimensionChange(obj) {
    const width = obj.width || this.state.width
    const height = obj.height || this.state.height
    const x = obj.x || this.state.x
    const y = obj.y || this.state.y
    this.setState({
      width, height, x, y
    })
  }

  // Lifecycle hooks
  componentDidUpdate() {
    this.changeFont()
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
          <div className="flex-row-3">
            <TextEdit onChange={this.handleTextChange} text={this.state.text} />
          </div>
          <div className="flex-row-1">
            <Colorpicker onChange={this.handleColorChange} title="Color" defaultValue="#fa541c" />
            {/* <Colorpicker onChange={this.handleBgColorChange} title="Bg Color" /*/}
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-row-2">
            <FontFamilySelect changeFont={this.changeFont} fontFamily={this.state.fontFamily} />
          </div>
          <div className="flex-row-2">
            <FontStyleSelect variants={this.state.variants} fontVariant={this.state.fontVariant} onChange={this.changeVariant} />
            <FontSize onChange={this.handleFontSizeChange} fontSize={this.state.fontSize} />
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-row-2">
            <Dimensions onChange={this.handleDimensionChange} title="Canvas Width" text={this.state.width} measures="width" />
            <Dimensions onChange={this.handleDimensionChange} title="Canvas Height" text={this.state.height} measures="height" />
          </div>
          <div className="flex-row-2">
            <Dimensions onChange={this.handleDimensionChange} title="Text X Position" text={this.state.x} measures="x" />
            <Dimensions onChange={this.handleDimensionChange} title="Text Y Position" text={this.state.y} measures="y" />
          </div>
        </div>
        <DownloadCode showSVGCode={this.showSVGCode} downloadSVGFile={this.downloadSVGFile} />
        <Credits />
      </div>
    );
  }
}

export default App;
