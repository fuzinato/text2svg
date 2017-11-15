import React, { Component } from 'react';
import C2S from './vendor/canvas2svg'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: "Hello World"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  renderCanvas() {
    const text = this.state.text;
    const ctx = new C2S(1000, 500);
    ctx.fillStyle = "red";
    ctx.font = "48px Pacifico";
    ctx.fillText(`${text}`, 10, 50);

    // var mySerializedSVG = ctx.getSerializedSvg(); //true here, if you need to convert named to numbered entities.
    //If you really need to you can access the shadow inline SVG created by calling:
    var svg = ctx.getSvg();
    return svg
  }

  handleChange(e) {
    const text = e.target.value
    this.setState({ text })
  }

  renderSvg() {
    const svg = this.renderCanvas()
    this.refs.svgContainer.innerHTML = ''
    this.refs.svgContainer.appendChild(svg)
  }

  componentDidUpdate () {
    this.renderSvg();
  }

  componentDidMount() {
    this.renderSvg();
  }

  render() {
    return (
      <div>
        <div ref="svgContainer"></div>
        <input type="text" value={this.state.text} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default App;
