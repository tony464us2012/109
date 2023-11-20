import React, { useState, useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Card, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import Loader from './Loader'


const ProductModal = ({ show, onHide, id, price }) => {
    const dispatch = useDispatch()
   
    const productDetail = useSelector(state => state.productDetails)
    const { loading, product:productInfo } = productDetail
    const { name, image, description, category, available } = productInfo
    
      const productList = useSelector(state => state.productList)
      const { products } = productList

      const itemPrice = price
      const [extraPatty, setExtraPatty] = useState('')
      const [pattySwap, setPattySwap] = useState('')
      const [sideSwap, setSideSwap] = useState('')
      const [upgradeSide, setUpgradeSide] = useState('')
      const [extras, setExtras] = useState([])
      const [large, setLarge] = useState(false)
      const [sauce, setSauce] = useState('')
      const [burger, setBurger] = useState('')
      const [fryAddOn, setFryAddOn] = useState('')
      const [, setTacoText] = useState('')
      const [instructions, setInstructions] = useState('')
      const ref = useRef(price)

      
    const addons = products.filter(product => product.category === 'AddOns')
    const largefrysampler = addons.filter(sampler =>  sampler.addOnType === 'LargeFrySampler')
    const [{ price:samplerPrice, available:samplerAvailable }] = largefrysampler
    const largechickenwings = addons.filter(wings => wings.addOnType === 'LargeChickenWings')
    const [{price:wingPrice, available:wingAvailable}] = largechickenwings
    const addMeat = addons.filter(meat => meat.name === 'Extra Meat Patty')
    const [{name:meatName, price:meatPrice, available:meatAvailable}] = addMeat
    const chicken = addons.filter(chk => chk.addOnType === 'Chicken')
    const [{name:chickenName, price:chickenPrice, available:chickenAvailable}] = chicken
    const bacon = addons.filter(bcn => bcn.addOnType === 'Bacon')
    const [{name:baconName, price:baconPrice, available:baconAvailable}] = bacon

      const handleChange = (e) => {setInstructions(e.target.value)}
      const radioChange = (e) => {
        let { name, value } = e.target
        let newValue = extractPrice(value)

        if (name === 'frysampler' || name === 'chickenwings') {
          if (newValue) {
            setLarge(true)
            ref.current = ref.current + newValue
          } else {
            setLarge(false)
            ref.current = price
          }
        }
        if(name === 'sauce') {
          setSauce(value)
        }
        if (name === 'meat' && e.target.checked) {
          setExtraPatty(value)
          ref.current = ref.current + (extractPrice(value))
        }
        if (name === 'meat' && !e.target.checked) {
          setExtraPatty('')
          ref.current = ref.current - (extractPrice(value))
        }
        if (name === 'SwapOption') {
          if (!pattySwap){
            setPattySwap(value)
            ref.current = ref.current + (extractPrice(value))
          } else {
            const prevPrice = extractPrice(pattySwap)
            setPattySwap(value)
            ref.current = ref.current - prevPrice + (extractPrice(value))
          }
        }
        if (name === 'SwapSide') {
          if (!sideSwap) {
            setSideSwap(value)
            ref.current = ref.current + (extractPrice(value))
          } else {
            const prevPrice = extractPrice(sideSwap)
            setSideSwap(value)
            ref.current = ref.current - prevPrice + (extractPrice(value))
          }
        }
        if (name === 'UpgradeSide') {
          if (!upgradeSide) {
            setUpgradeSide(value)
            ref.current = ref.current + (extractPrice(value))
          } else {
            const prevPrice = extractPrice(upgradeSide)
            setUpgradeSide(value)
            ref.current = ref.current - prevPrice + (extractPrice(value))
          }
        }
        if ((name === 'Extras' || name === 'bacon' || name === 'chicken') && e.target.checked) {
          setExtras([...extras, value])
          ref.current = ref.current + newValue
        }
        if ((name === 'Extras' || name === 'bacon' || name === 'chicken') && !e.target.checked ) {
         const newArray = extras.filter(x => x !== value)
         setExtras(newArray)
         ref.current = ref.current - newValue 
        }
        if (name === 'burger') {
          if (!burger) {
            setBurger(value)
            ref.current = ref.current + (extractPrice(value))
          } else {
            const prevPrice = extractPrice(burger)
            setBurger(value)
            ref.current = ref.current - prevPrice + (extractPrice(value))
          }
        }
        if (name === 'fryAddOn') {
          setFryAddOn(value)
          ref.current = ref.current + newValue
        }
    
        if (name === 'tacoText') {
          setTacoText(value)
        }
        }

    const extractPrice = (string) => {
      if(string) {
        return Number(string.split('+')[1])
      } else {
        return 0
      }
    }

    const addToCartHandler = (e) => {
      e.preventDefault()
      const cartItem = {
        id,
        name,
        image,
        price: ref.current,
        description,
        extraPatty, 
        pattySwap,
        sideSwap,
        upgradeSide,
        extras,
        large,
        sauce, 
        burger,
        fryAddOn,
        instructions
      }
      onHide()
      dispatch(addToCart(cartItem))
    }
    
    return (
        <>
            { 
              loading ? <Loader /> :
                <Modal key={id}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={onHide}
                  animation
                >
                  <Card>
                  <div id={id} key={id} className="food-image"></div>
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>
                      {description ? <div className='modal-description'>{description}</div> : ''}
                      <Form onSubmit={addToCartHandler}>
                        {name === 'Fry Sampler' ? 
                         <Form.Group>
                          <span className='required-title'>Select Size:</span><span className='required'>Required</span><br/>
                            <input className='mt' type="radio" name="frysampler" value={`Small +0`} onChange={radioChange} required />
                            <label htmlFor="smallfrysampler"> Small </label><br/>
                            {samplerAvailable ? <><input type="radio" name="frysampler" value={`Large +${samplerPrice}`} onChange={radioChange} required/>
                            <label htmlFor="largefrysampler">{`Large +${samplerPrice}`}</label></> : ''}
                         </Form.Group>
                        : ''
                      }
                        {name === 'Chicken Wings 8 Piece' ? 
                         <Form.Group>
                          <span className='required-title'>Select Size:</span><span className='required'>Required</span><br/>
                            <input className='mt' type="radio" name="chickenwings" value={`8 Pieces +0`} onChange={radioChange} required />
                            <label htmlFor="chickenwings"> 8 Pieces </label><br/>
                            {wingAvailable ? <><input type="radio" name='chickenwings' value={`15 Pieces +${wingPrice}`} onChange={radioChange} required/>
                            <label htmlFor='chickenwings'>{`15 Pieces +${wingPrice}`}</label></> : ''}
                         </Form.Group>
                        : ''
                      }
                      {name === 'Chicken Wings 8 Piece' || name === 'Duck Wings' ? 
                      <Form.Group>
                       <span className='required-title'>Select Sauce:</span><span className='required'>Required</span><br/>
                         <input className='mt' type="radio" id="option-separate" name="sauce" value={'Asian Chili Sauce'} onChange={radioChange} required />
                         <Form.Label htmlFor="sauce">Asian Chili Sauce</Form.Label><br/>
                         <input type="radio" id="option-separate" name='sauce' value={'Blue Cheese BBQ Sauce'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Blue Cheese BBQ Sauce</Form.Label><br/>
                         <input type="radio" id="option-separate" name='sauce' value={'Honey Ginger Sauce'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Honey Ginger Sauce</Form.Label><br/>
                         <input type="radio" id="option-separate" name='sauce' value={'House BBQ Sauce'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>House BBQ Sauce</Form.Label><br/>
                         <input type="radio" id="option-separate" name='sauce' value={'Spicy Buffalo Sauce'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Spicy Buffalo Sauce</Form.Label>
                      </Form.Group>
                     : ''
                      }
                      { category === 'Burger' ? 
                        <Fragment>
                          { meatAvailable ? 
                          <Form.Group>
                            <h4>Add Ons</h4>
                              <input type="checkbox" name="meat" selected={extraPatty} value={`${meatName} +${meatPrice}`} onChange={radioChange}/>
                              <Form.Label htmlFor="meat">{`${meatName} +${meatPrice}`}</Form.Label><br/>
                          </Form.Group> : ''}
                          <Form.Group>
                            <h4>Swap Patty</h4>
                            <div id="SwapPatty">
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'SwapOption').map(addon => 
                                  <>
                                      <input type="radio" className="checkbox"  name='SwapOption' selected={`${addon.name} +${addon.price}` === pattySwap } value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                      <Form.Label htmlFor="SwapOption">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                            </div>
                          </Form.Group>
                          <Form.Group>
                            <h4>Extras</h4>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'Extras').map(addon => 
                                  <>
                                      <input type="checkbox" name="Extras" value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                      <Form.Label htmlFor="Extras">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                          <Form.Group>
                            <h4>Swap Side</h4>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'SwapSideOption').map(addon => 
                                  <>
                                      <input type="radio" name="SwapSide" disabled={upgradeSide} selected={`${addon.name} +${addon.price}` === sideSwap } value={`${addon.name} +${addon.price}`}  onChange={radioChange}/>
                                      <Form.Label htmlFor="SwapSide">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                          <Form.Group>
                            <h4>Upgrade Side</h4>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'UpgradeOption').map(addon => 
                                  <>
                                      <input type="radio" name="UpgradeSide" disabled={sideSwap} selected={`${addon.name} +${addon.price}` === upgradeSide } value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                      <Form.Label htmlFor="UpgradeSide">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>

                        </Fragment>: ''
                      }
                      { category === 'Salad' && name !== 'Burger In A Bowl' ? 
                          <Form.Group>
                            <h4>Add-Ons</h4>
                            {
                              name === 'Caesar Salad' && baconAvailable ? 
                              <>
                              <input type="checkbox" name="bacon" value={`${baconName} +${baconPrice}`} onChange={radioChange} />
                              <Form.Label htmlFor="Bacon">{`${baconName} +${baconPrice}`}</Form.Label><br/>
                          </> : ''
                            }
                              {
                                chickenAvailable ? 
                                  <>
                                      <input type="checkbox" name="chicken" value={`${chickenName} +${chickenPrice}`} onChange={radioChange} />
                                      <Form.Label htmlFor="sauce">{`${chickenName} +${chickenPrice}`}</Form.Label><br/>
                                  </> : ''
                              }
                          </Form.Group>
                        : ''
                      }
                      { name === 'Burger In A Bowl' ? 
                          <Form.Group>
                            <span className='required-title'>Select Burger</span><span className='required'>Required</span><br/>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'BurgerInABowl').map(addon => 
                                  <div className='mt'>
                                      <input type="radio" name="burger" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="burger">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </div>
                                  )
                              }
                          </Form.Group>
                        : ''
                      }
                      { name === 'Homemade Mac & Cheese' ? 
                          <Form.Group>
                            <h4>Add-Ons</h4>
                              {
                                baconAvailable ? 
                                  <>
                                      <input type="checkbox" name="bacon" value={`${baconName} +${baconPrice}`} onChange={radioChange} />
                                      <Form.Label htmlFor="Bacon">{`${baconName} +${baconPrice}`}</Form.Label><br/>
                                  </> : ''
                              }
                              {
                                chickenAvailable ? 
                                  <>
                                      <input type="checkbox" name="chicken" value={`${chickenName} +${chickenPrice}`} onChange={radioChange} />
                                      <Form.Label htmlFor="Chicken">{`${chickenName} +${chickenPrice}`}</Form.Label><br/>
                                  </> : ''
                              }
                          </Form.Group>
                        : ''
                      }
                      { category === 'Sandwich' ? 
                        <Fragment>
                          <Form.Group>
                            <h4>Upgrade Option</h4>
                            {
                                addons.filter(addon => addon.available && addon.addOnType === 'UpgradeOption').map(addon => 
                                  <>
                                      <input type="radio" name="UpgradeSide" value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                      <Form.Label htmlFor="UpgradeSide">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                        </Fragment>: ''
                      }
                      {
                        name === 'Fries' ||  name === 'Tots' ? 
                        <Fragment>
                        <Form.Group>
                          <h4>Add-Ons</h4>
                          {
                              addons.filter(addon => addon.available && addon.name === 'Loaded up with Cheese & Applewood Smoked Bacon Bits').map(addon => 
                                <>
                                    <input type="radio" name="fryAddOn" value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                    <Form.Label htmlFor="fryAddOn">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                </>
                                )
                            }
                        </Form.Group>
                      </Fragment>: ''
                      }
                      {
                        name === 'Sweet Potato Fries' ||  name === 'Sweet Potato Tots' ? 
                        <Fragment>
                        <Form.Group>
                          <h4>Add-Ons</h4>
                          {
                              addons.filter(addon => addon.available && addon.name === 'Loaded up With Caramel & Cinnamon').map(addon => 
                                <>
                                    <input type="radio" name="fryAddOn" value={`${addon.name} +${addon.price}`} onChange={radioChange} />
                                    <Form.Label htmlFor="fryAddOn">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                </>
                                )
                            }
                        </Form.Group>
                      </Fragment>: ''
                      }
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>List Any Preferences</Form.Label>
                        <Form.Text as="textarea" placeholder='allergies, etc.' style={{border: '1px solid black', padding: '.4rem'}} width='90%' value={instructions} onChange={handleChange} rows={3} />
                      </Form.Group>
                      <Button type='submit' variant="success" size='sm' disabled={!available}>{available ? 'Add To Cart' : 'Unavailable'}</Button>
                      </Form>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Modal>
            }
        </>
            );
}

export default ProductModal
