import React from 'react'
import { Nav } from 'react-bootstrap'

const TacoHeader = ({tacoTabHandler, tacoTab}) => {

  const selectHandler = (selected) =>  {
    if (tacoTab === selected) {
      return { backgroundColor: 'black', color: '#fff'}
    }
  }
    return (
        <Nav as="ul" className='taco-header'>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Tacos')} onClick={() => tacoTabHandler('Tacos')}>Tacos</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Single')}  onClick={() => tacoTabHandler('Single')}>Single Tacos</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Quesadilla')}  onClick={() => tacoTabHandler('Quesadilla')}>Quesadilla</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Side')}  onClick={() => tacoTabHandler('Side')}>Side Orders</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Bowls&Salads')}  onClick={() => tacoTabHandler('Bowls&Salads')}>Bowls and Salads</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Fajitas')}  onClick={() => tacoTabHandler('Fajitas')}>Fajitas</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Burritos')}  onClick={() => tacoTabHandler('Burritos')}>Burritos</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Specials')}  onClick={() => tacoTabHandler('Specials')}>Lunch Specials</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default TacoHeader
