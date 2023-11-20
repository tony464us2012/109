import React,{ useState } from 'react';
import { useDispatch } from 'react-redux'
import { addBottle } from '../../../actions/beerActions'

const AddBottle = () => {

    const dispatch = useDispatch()

    const [bottle, setBottle] = useState({
        name: '',
        price: '', 
        type: ''
    });

    const onChange = (e) =>{
        setBottle({...bottle, [e.target.name]: e.target.value});};

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addBottle(bottle))
        setBottle({
            name: '',
            price: '',
            type: ''
        })
    };    
    return (
        <>
            <form className="bottle-form" style={{marginTop: '1rem'}} onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="name" className='mb-2'>Add Bottle</label>
                        <input type="text"  name="name" className="form-control" id="bottleName" onChange={onChange} value={bottle.name} required/>
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" className="form-control" id="price" onChange={onChange} value={bottle.price} required/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="type" className='mb-2'>Beer</label><br></br>
                        <select id="type" className="custom-select" name="type" onChange={onChange} value={bottle.type}>
                                            <option value="0">Select Type</option>
                                            <option value="Ale">Ale</option>
                                            <option value="IPA">IPA</option>
                                            <option value="Lager">Lager</option>
                                            <option value="Sour">Sour</option>
                                            <option value="Porter and Stout">Porter and Stout</option>
                                            <option value="Special">Special</option>
                                            <option value="Cider">Cider</option>
                                            <option value="Wine">Wine</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2" style={{marginTop:'auto', marginLeft:'.5rem'}}>
                        <input type="submit" className="btn btn-primary" name="add-btn" value="Add Bottle"/>
                    </div>
                </div>
            </form>
        </>
    )
}       

    export default AddBottle