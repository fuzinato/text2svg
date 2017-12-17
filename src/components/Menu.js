import React from 'react'
import { Popup, Button, Icon } from 'semantic-ui-react'

const Menu = () => {
  return (
    <div className="menu">
      <Popup
        trigger={<Button icon> <Icon name='compose' size='big' />
        <span>Edit</span>
      </Button>}
        content='Add users to your feed'
        position='top left'
      />
      <Popup
        trigger={<Button icon> <Icon name='text height' size='big' />
        <span>Text Height</span>
      </Button>}
        content='Add users to your feed'
        position='top center'
      />
      <Popup
        trigger={
          <Button icon><Icon name='tint' color='purple' size='big' />
            <span>Color</span>
          </Button>}
        content='Add users to your feed'
        position='top center'
      />
      <Popup
        trigger={<Button icon><Icon name='code' size='big' />
        <span>SVG Code</span>
      </Button>}
        content='Add users to your feed'
        position='top right'
      />

      <Popup
        trigger={<Button icon><Icon name='book' size='big' />
        <span>Font Family</span>
      </Button>}
        content='Add users to your feed'
        position='bottom left'
      />

      <Popup
        trigger={<Button icon><Icon name='italic' size='big' />
        <span>Font Style</span>
      </Button>}
        content='Add users to your feed'
        position='bottom center'
      />

      <Popup
        trigger={<Button icon><Icon name='crop' size='big' />
        <span>Crop</span>
      </Button>}
        content='Add users to your feed'
        position='bottom center'
      />
      <Popup
        trigger={<Button icon><Icon name='download' size='big' />
        <span>Download</span>
      </Button>}
        content='Add users to your feed'
        position='bottom right'
      />


    </div>
  )
}

export default Menu
