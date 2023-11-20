import React, { useState } from 'react'
import { useSelector  } from 'react-redux'
import TacoHeader from './TacoHeader'
import SingleTacos from './taco-components/Single'
import Quesadillas from './taco-components/Quesadillas'
import Tacos from './taco-components/Taco'
import SideOrders from './taco-components/SideOrders'
import BowlandSalads from './taco-components/BowlandSalads'
import Fajitas from './taco-components/Fajitas'
import Burritos from './taco-components/Burritos'
import LunchSpecial from './taco-components/Special'
import Loader from './Loader'


const TacoRico = () => {
    
    const [tacoTab, setTacoTab] = useState('Tacos')
    
    const productList = useSelector(state => state.productList)
    const { loading, products } = productList

    const tacos = products.filter(tacos => tacos.tacoCategory === 'Tacos')
    const singletacos = products.filter(singleTacos => singleTacos.tacoCategory === 'SingleTacos')
    const quesadillas = products.filter(quesadilla => quesadilla.tacoCategory === 'Quesadillas')
    const sideorders = products.filter(sideOrders => sideOrders.tacoCategory === 'SideOrders')
    const bowlandsalads = products.filter(bowlandSalads => bowlandSalads.tacoCategory === 'BowlsandSalads')
    const fajitas = products.filter(fajitas => fajitas.tacoCategory === 'Fajitas')
    const burritos = products.filter(burritos => burritos.tacoCategory === 'Burritos')
    const lunchspecials = products.filter(lunchSpecials => lunchSpecials.tacoCategory === 'LunchSpecials')

    
    const tacoTabHandler = (tab) => {
        setTacoTab(tab)
    }

    return loading ? <Loader /> : (
        <>
            <TacoHeader tacoTabHandler={tacoTabHandler} tacoTab={tacoTab} />
            {tacoTab === 'Tacos' ? <Tacos tacos={tacos} key={tacos._id} /> :
             tacoTab === 'Single' ? <SingleTacos singletacos={singletacos} key={singletacos._id}/> :
             tacoTab === 'Quesadilla' ?  <Quesadillas quesadillas={quesadillas} key={quesadillas._id}/> :
             tacoTab === 'Side' ?  <SideOrders sideorders={sideorders} key={sideorders._id} /> :
             tacoTab === 'Bowls&Salads' ? <BowlandSalads bowlandsalads={bowlandsalads} key={bowlandsalads._id} /> : 
             tacoTab === 'Fajitas' ? <Fajitas fajitas={fajitas} key={fajitas._id} /> :
             tacoTab === 'Burritos' ? <Burritos burritos={burritos} key={burritos._id} /> :
             <LunchSpecial lunchspecials={lunchspecials} key={lunchspecials._id} />
            }
        </>
    )
}

export default TacoRico