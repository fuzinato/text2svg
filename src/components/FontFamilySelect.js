import React from "react"
import "whatwg-fetch"
import Wrapper from './Wrapper';

class FontFamilySelect extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: true
    }

    this.loadFontList()
  }

  loadFontList() {
    // const fontsListUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAqt_7eAMB_y6nsKZBvb56UaIuo6SidwKU"
    const fontsListUrl = "../fonts.json"

    fetch(fontsListUrl)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.familyList = json.items.map((font) => {
          return {
            text: font.family,
            value: font.family,
            variants: font.variants,
            files: font.files
          }
        });

        this.setState({
          loading: false
        })

      }).catch((ex) => {
        console.log("parsing failed", ex)
      })
  }

  handleChange(e) {
    const selectedfontFamily = e.target.value;
    const variants = this.familyList[e.target.selectedIndex].variants
    const files = this.familyList[e.target.selectedIndex].files
    this.props.changeFont(selectedfontFamily, variants, files)
  }

  componentDidMount() {
    // console.log(this.selectEl)
    // this.selectel.onchange();
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <Wrapper title="Font Family" plusClass="family-select">
        <div className="selectContainer">
          <select ref={(input) => { this.selectEl = input; }} onChange={this.handleChange.bind(this)} value={this.props.fontFamily}>
            {this.familyList.map((item) => <option key={item.value} value={item.value}>{item.value}</option>)}
          </select>
        </div>
      </Wrapper>
    )
  }
}

export default FontFamilySelect