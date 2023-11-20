import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const AddOns = ({ addons, getProductHandler }) => {
    return (
        <tbody>
            {addons.sort((a, b) => (a.category > b.category) ? 1 : -1).map(product => (
                <tr key={product._id}>
                <td><button>{product.name}</button></td>
                <td><button>${product.price}</button></td>
                <td><button>{product.available ? 'Available' : 'Unavailable'}</button></td>
                <td style={{display: 'flex', justifyContent: 'space-around'}}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <button  onClick={() => getProductHandler(product._id)}>
                            <i className='fas fa-edit'></i>
                        </button>
                    </LinkContainer>
                        {/* <button style={{color: 'red'}}  onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'></i>
                        </button> */}
                </td>
                </tr>
                        ))}
        </tbody>
    )
}

export default AddOns