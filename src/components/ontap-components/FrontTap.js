import React from 'react'
import MainDisplayBeers from './MainDisplayBeers'
import Message from '../Message'

const FrontTap = ({ displayBeers }) => {
    return (
        <>
           { !displayBeers ? <Message>No Beers To Show</Message> : 
           <div className='menu-item-container'>
                {   displayBeers.sort((a, b) => a.beerName > b.beerName ? 1 : -1).map((x) =>  <MainDisplayBeers 
                    name={x.beerName} 
                    logo={x.beerLogo} 
                    abv={x.beerABV}
                    ibu={x.beerIBU}
                    beerstyle={x.beerStyle}
                    brewery={x.brewery}
                    ratingCount={x.ratingCount}
                    ratingScore={x.ratingScore}
                    description={x.description}
                    key={x._id} 
                    logo2={x.beerLogo2}
                    />)
                }
           </div>
           }
        </>
    )
}

export default FrontTap
