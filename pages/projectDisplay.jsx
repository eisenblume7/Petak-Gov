import React from 'react'
import CategoryButtons from "../components/CategoryButtons";
import ProductsList from "../components/ProductsList";
import {Helmet} from "react-helmet";

const projectDisplay = () => {
    return (
        <div className='flex items-center justify-center mb-12 bg-center bg-cover bg-primary/20'>
            <Helmet>
                <title>
                    List of Project
                </title>
            </Helmet>

            <div className='absolute top-20 left-20 right-20'>
                <CategoryButtons/>
                <ProductsList/>
            </div>
        </div>

    )
}

export default projectDisplay;