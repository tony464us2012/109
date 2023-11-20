import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation='grow' role='status' variant="dark" style={{font:"4rem", marginLeft:'50%', marginTop: '8rem'}}>
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
