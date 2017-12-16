import React from 'react'
import { Popup, Button, Icon } from 'semantic-ui-react'

const Menu = () => {
  return (
    <div class="menu">
      <Popup
        trigger={<Button icon='compose'  size='huge' />}
        content='Add users to your feed'
        position='top left'
      />
      <Popup
        trigger={<Button icon='text height' size='huge' />}
        content='Add users to your feed'
        position='top center'
      />
      <Popup
      trigger={<Button icon><Icon name='tint' color='purple' size='large'/></Button>}
      content='Add users to your feed'
      position='top center'
    />
      <Popup
        trigger={<Button icon='code' size='huge' />}
        content='Add users to your feed'
        position='top right'
      />

      <Popup
        trigger={<Button icon='book' size='huge' />}
        content='Add users to your feed'
        position='bottom left'
      />

      <Popup
        trigger={<Button icon='italic' size='huge' />}
        content='Add users to your feed'
        position='bottom center'
      />

      <Popup
        trigger={<Button icon='crop' size='huge' />}
        content='Add users to your feed'
        position='bottom center'
      />
      <Popup
        trigger={<Button icon='download' size='huge' />}
        content='Add users to your feed'
        position='bottom right'
      />
    

    </div>
  )
}

export default Menu
