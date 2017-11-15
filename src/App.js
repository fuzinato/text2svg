import React, { Component } from 'react';
import C2S from './vendor/canvas2svg'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.renderCanvas = this.renderCanvas.bind(this)
  }

  renderCanvas () {
    const ctx = new C2S(200, 100);
    ctx.fillStyle = "red";
    ctx.font = "48px Pacifico";
    ctx.fillText('Hello world', 10, 50);

    var mySerializedSVG = ctx.getSerializedSvg(); //true here, if you need to convert named to numbered entities.

    //If you really need to you can access the shadow inline SVG created by calling:
    var svg = ctx.getSvg();
    return svg
  } 

  componentDidMount() {
    const svg = this.renderCanvas();
    this.refs.svgContainer.appendChild(svg)
  }
  
  render() {
    return (
      <div ref="svgContainer"></div>
    );
  }
}

export default App;
