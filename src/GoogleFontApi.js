import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import 'whatwg-fetch'


class GoogleFontApi extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      familyList: [],
      selectedFont: {},
      loading: true
    }

    

    // const fontsListUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAqt_7eAMB_y6nsKZBvb56UaIuo6SidwKU'
    const fontsListUrl = '../fonts.json'
    
    fetch(fontsListUrl)
    .then((response) => {
      return response.json()
    }).then((json) => {
      
      const familyList = json.items.map((font) => {
        return {
          key: font.family,
          text: font.family,
          value: font.family,
          variants: font.variants
        }
      });
      const selectedFont = familyList.filter((item) => item.key === this.props.defaultFont)[0]

      this.setState({
        familyList,
        selectedFont,
        loading: false
      })


    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  loadFont(fontFamily) {
    const selectedFont = this.refs.inputFontFamily.getSelectedItem();
    this.setState({ selectedFont })
    this.props.changeFont(selectedFont.key)
  }

  componentDidUpdate() {
      console.log('componentDidUpdate')
  }

  render(){
    if(this.state.loading){
      return null
    }
   
    const variantsOpts = this.state.selectedFont.variants.map((variant) => {
      return { text: variant, value: variant }
    });

    return(
      <div className="google-fonts-api">
      I would like to have&nbsp;
      {/* Font Family */}
      <Dropdown 
        search 
        selection 
        ref="inputFontFamily" 
        options={this.state.familyList}
        defaultValue={this.props.defaultFont}
        placeholder='Select Font Family' 
        onChange={this.loadFont.bind(this)} /> &nbsp;font family with &nbsp;
      {/* Font Style */}
        <Dropdown
          floating
          inline
          ref="inputFontStyle" 
          options={variantsOpts}
          defaultValue="regular"
          onChange={(e) => { console.log(this) }} 
        />
        &nbsp;style.
      </div>
    )
  }
}

export default GoogleFontApi