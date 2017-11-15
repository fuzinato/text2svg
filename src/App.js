import React, { Component } from 'react';
import C2S from './vendor/canvas2svg';
import { ChromePicker } from 'react-color';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World",
      color: "#ff9966"
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.downloadSVGFile = this.downloadSVGFile.bind(this)
    this.showSVGCode = this.showSVGCode.bind(this)
  }

  renderCanvas() {
    const { text, color } = this.state;
    const ctx = new C2S(1000, 500);
    ctx.fillStyle = `${color}`;
    ctx.font = "48px Pacifico";
    ctx.fillText(`${text}`, 10, 50);

    // var mySerializedSVG = ctx.getSerializedSvg(); //true here, if you need to convert named to numbered entities.
    //If you really need to you can access the shadow inline SVG created by calling:
    var svg = ctx.getSvg();
    return svg
  }

  handleTextChange(e) {
    const text = e.target.value
    this.setState({ text })
  }

  handleColorChange(colorObj, event) {
    const color = colorObj.hex
    this.setState({ color })
  }

  renderSvg() {
    const svg = this.renderCanvas()
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
    this.renderSvg();
  }

  render() {
    return (
      <div>
        <div ref="svgContainer"></div>
        <input type="text" value={this.state.text} onChange={this.handleTextChange.bind(this)} />
        <ChromePicker
          color={this.state.color}
          onChangeComplete={this.handleColorChange.bind(this)}
        />
        <button onClick={this.downloadSVGFile}>Download File</button>
        <button onClick={this.showSVGCode}>Show SVG code</button>
      </div>
    );
  }
}

export default App;
