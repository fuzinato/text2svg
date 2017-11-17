import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'whatwg-fetch'


class GoogleFontApi extends React.Component{
  constructor(){
    super()

    this.state = {
      fonts: []
    }

    // const fontsListUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAqt_7eAMB_y6nsKZBvb56UaIuo6SidwKU'
    const fontsListUrl = '../fonts.json'
    
    fetch(fontsListUrl)
    .then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        fonts: json.items
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  loadFont(fontFamily) {
    const selectedFontObj = this.refs.searchForm.getSelectedItem();
    this.props.changeFont(selectedFontObj)
    // WebFont.load({
    //   google: {
    //     families: [selectedFont.text]
    //   }
    // });
  }


  render(){
    const fontList = this.state.fonts.map((font) => {
      return {
        key:font.family, 
        text:font.family,
        value: font.family.replace(' ', '_').toLowerCase()
      }
    });

    return(
      <div className="google-fonts-api">
        <p>Google Font</p>
        <Dropdown 
          search 
          selection 
          placeholder='Select Font Family' 
          options={fontList}
          ref="searchForm" 
          onChange={this.loadFont.bind(this)}/>
        <Dropdown
          fluid
          search
          button
          labeled
          floating
          icon="world"
          className="icon"
          options={fontList}
          placeholder='Select Font Family' 
          onChange={this.loadFont.bind(this)}
        />
      </div>
    )
  }
}

export default GoogleFontApi