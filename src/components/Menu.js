import React from 'react'
import {  Button, Icon } from 'semantic-ui-react'

const Menu = () => {
  return (
    <div>
      <Icon name="tint" />
      <Button icon><Icon name='text cursor' /></Button>
      <Button icon><Icon name='text height' /></Button>
      <Button icon><Icon name='download' /></Button>
      <Button icon><Icon name='code' /></Button>
      <Button icon><Icon name='font' /></Button>
      <Button icon><Icon name='bold' /></Button>
      <Button icon color="pink"><Icon name='tint' /></Button>
      <Button icon color="pink"><Icon name='share alternate' /></Button>
    </div>
  )
}

export default Menu
