import React from 'react';
import TapItem from './layout/TapItem';
import '../../tap.css'

const BackTap = ({ displayBeers }) => {

    return (
        <>
            <h1 className='text-center title fs-4'>Beers on Tap</h1>
            <div className='menu-item-container'>
                {displayBeers.sort((a, b) => a.beerName > b.beerName ? 1 : -1).map((x, index) => <TapItem
                name={x.beerName} 
                logo={x.beerLogo} 
                abv={x.beerABV}
                ibu={x.beerIBU}
                beerstyle={x.beerStyle}
                brewery={x.brewery}
                ratingCount={x.ratingCount}
                ratingScore={x.ratingScore}
                key={index} 
                id={x._id}
                logo2={x.beerLogo2}
                />)}
            </div>
        </>
    )
}

export default BackTap