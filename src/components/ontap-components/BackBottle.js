import React from 'react'
import BottleItem from './layout/BottleItem'
import WineItem from './layout/WineItem'
import '../../tap.css'

const BackBottle = ({ bottleBeer }) => {

    return (
        <>
        <h1 style={{marginTop: '2rem'}} className='text-center title fs-4'>Beers on Bottles</h1>
        <div className="bottle-container">
            <div className="bottle-item">
                <h1>IPA</h1>
                { bottleBeer.filter(x => x.type === 'IPA').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Lager</h1>
                { bottleBeer.filter(x => x.type === 'Lager').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Sour</h1>
                { bottleBeer.filter(x => x.type === 'Sour').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Porter and Stout</h1>
                { bottleBeer.filter(x => x.type === 'Porter and Stout').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Ale</h1>
              { bottleBeer.filter(x => x.type === 'Ale').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Ciders</h1>
                { bottleBeer.filter(x => x.type === 'Cider').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            <div className="bottle-item">
                <h1>Special</h1>
                { bottleBeer.filter(x => x.type === 'Special').sort((a, b) => a.name > b.name ? 1 : -1).map((beer, index) => <BottleItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
            </div>
            </div>
            <h1 style={{marginTop: '2rem'}} className='text-center title fs-4'>Wines</h1>
            <div className="wine-container">
                <div className="wine-item-container">
                    <div className="wine-item">
                    { bottleBeer.filter(x => x.type === 'Wine').sort((a, b) => a.name > b.name ? 1 : -1).filter((x, index) => index <= 10).map((beer, index) => <WineItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
                    </div>
                    <div className="wine-item">
                    { bottleBeer.filter(x => x.type === 'Wine').sort((a, b) => a.name > b.name ? 1 : -1).filter((x, index) => index > 10).map((beer, index) => <WineItem name={beer.name} price={beer.price} key={index} id={beer._id} /> )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BackBottle
