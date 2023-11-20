import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ( { title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: '109 Burger Joint',
    description: 'Artisan Burgers for carryout',
    keywords: 'draft beers, artisan burger'
}

export default Meta
