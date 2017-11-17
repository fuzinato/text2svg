import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'whatwg-fetch'


class GoogleFontApi extends React.Component{
  constructor(){
    super()

    this.state = {
      fonts: [],
      selectedFont: {}
    }

    // const fontsListUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAqt_7eAMB_y6nsKZBvb56UaIuo6SidwKU'
    const fontsListUrl = '../fonts.json'
    
    fetch(fontsListUrl)
    .then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        fonts: json.items,
        selectedFont: {}
      })
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  loadFont(fontFamily) {
   
    console.log('loadFont')
    const selectedFont = this.refs.inputFontFamily.getSelectedItem();
    this.setState({ selectedFont })
    this.props.changeFont(selectedFont)
  }

  changeStyle() {
    console.log(this)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')

    return true
    // this.setState({ selectedFont })
    // this.props.changeFont(this.state.selectedFont)
  }

  componentDidUpdate() {

      console.log('componentDidUpdate')
    // this.setState({ selectedFont })
    // 
  }


  render(){
    const familyList = this.state.fonts.map((font) => {
      return {
        key:font.family, 
        text:font.family,
        value: font.family,
        variants: font.variants
      }
    });

    let varianInput = '.'
    if(this.state.selectedFont.text){
      varianInput = <VariantList selectedFont={this.state.selectedFont}/>
    }
    return(
      <div className="google-fonts-api">
      I would like to have&nbsp;
        <Dropdown 
          search 
          selection 
          ref="inputFontFamily" 
          options={familyList}
          placeholder='Select Font Family' 
          onChange={this.loadFont.bind(this)}/> &nbsp;font family {varianInput}

      </div>
    )
  }
}

function VariantList(props) {
  const opts = props.selectedFont.variants.map((variant) => {
    return { text: variant, value: variant }
  });
  return (
    <span> 
      &nbsp;in&nbsp;
    <Dropdown
      floating 
      inline 
      options={opts}
      defaultValue={opts[0].text}
      onChange={(e) => {console.log(this)}}
    />
     &nbsp;style.
    </span>
  )
}
export default GoogleFontApi