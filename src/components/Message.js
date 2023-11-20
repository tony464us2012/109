import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant} style={{marginTop: '3rem', textAlign:'center', width: '100%'}}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
