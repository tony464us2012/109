import React from 'react'
import { Nav } from 'react-bootstrap'

const MenuHeader = ({tabHandler, tab}) => {

  const selectHandler = (selected) =>  {
    if (tab === selected) {
      return { backgroundColor: 'black', color: '#fff'}
    }
  }
    return (
        <Nav as="ul" className= 'menu-container'>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Appetizer')} onClick={() => tabHandler('Appetizer')}>Appetizers</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Burger')}  onClick={() => tabHandler('Burger')}>Burgers</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Salad')}  onClick={() => tabHandler('Salad')}>Salads</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('ForkandKnife')}  onClick={() => tabHandler('ForkandKnife')}>Fork and Knife</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Sandwich')}  onClick={() => tabHandler('Sandwich')}>Sandwiches</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Slider')}  onClick={() => tabHandler('Slider')}>Sliders</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Side')}  onClick={() => tabHandler('Side')}>Sides</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default MenuHeader
