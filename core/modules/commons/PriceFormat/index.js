/* eslint-disable camelcase */
import React from 'react';
import BundleProductTypePrice from './components/BundleProductTypePrice';
import OtherProductTypePrice from './components/OtherProductTypePrice';
import SimpleProductTypePrice from './components/SimpleProductTypePrice';

/**
 * Price Generator Component
 * @component
 * @param {array} priceRange - price range from magento GQL including regluar price and final price
 * @returns {object} [priceTiers] - tier prices from magento GQL
 */

const Price = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
    ...other
}) => {
    if (!priceRange) {
        return <>Invalid price</>;
    }

    if (productType === 'SimpleProduct') {
        return (
            <SimpleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                {...other}
            />
        );
    }
    if (productType === 'BundleProduct') {
        return (
            <BundleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                {...other}
            />
        );
    }

    return (
        <OtherProductTypePrice
            priceRange={priceRange}
            priceTiers={priceTiers}
            {...other}
        />
    );
};

export default Price;
