import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Nav } from 'react-bootstrap'
import FrontTap from '../components/ontap-components/FrontTap'
import FrontBottle from '../components/ontap-components/FrontBottle'
import Loader from '../components/Loader'
import { getMainBeers } from '../actions/beerActions'


const BeerScreen = () => {
  
    const [tab, setTab] = useState('onTap')
    
    const dispatch = useDispatch()

    const beers = useSelector(state => state.beers)
    const { displayBeers, bottleBeer, loading } = beers

    useEffect(() => {
        dispatch(getMainBeers())
    }, [dispatch])

    const tabHandler = (tab) => {
        setTab(tab)
    }

    const selectHandler = (selected) =>  {
        if (tab === selected) {
          return { backgroundColor: 'black', color: '#fff'}
        }
      }

    return loading ? <Loader /> : (
        <div className='padding'>
            <Nav as="ul" className='menu-container' style={{marginBottom: '1.5rem'}}>
                <Nav.Item as="li">
                    <Nav.Link className='menu-link' style={selectHandler('onTap')} onClick={() => tabHandler('onTap')}>On Tap</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link className='menu-link' style={selectHandler('bottles')}  onClick={() => tabHandler('bottles')}>Bottles</Nav.Link>
                </Nav.Item>
            </Nav>
            {tab === 'onTap' ? <FrontTap displayBeers={displayBeers} /> : <FrontBottle bottleBeer={bottleBeer} /> }
        </div>
    )
}

export default BeerScreen