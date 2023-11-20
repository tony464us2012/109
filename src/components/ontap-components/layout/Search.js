import React, { useRef } from 'react'
import { useDispatch  } from 'react-redux'
import { searchBeer } from '../../../actions/beerActions'
import { Form } from 'react-bootstrap'

const Search = () => {

    const dispatch = useDispatch()

    const searchRef = useRef()
   
     const onSubmit = e => {
         e.preventDefault()
         dispatch(searchBeer(searchRef.current.value))
     }

    return (
        <>
            <Form onSubmit={onSubmit} style={{display:'block', margin: '.5rem 0 1rem'}}>
                <Form.Group controlId='text'>
                    <Form.Label>Search Beers</Form.Label>
                    <Form.Control type='text' placeholder='What beer are you looking for?'></Form.Control>
                </Form.Group>
                <input type='submit' ref={searchRef} className='btn btn-primary' value='Search'/>
            </Form>
        </>
    )
}

export default Search
