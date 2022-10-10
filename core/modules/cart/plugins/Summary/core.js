/* eslint-disable no-lonely-if */
import config from '@config';
import { formatPrice } from '@helper_currency';
import propTypes from 'prop-types';

const CoreSummary = (props) => {
    const {
        DesktopView, MobileView, isDesktop, dataCart, globalCurrency = 'IDR', storeConfig,
        ...other
    } = props;
    const { t } = other;
    const { modules } = config;
    let dataSummary = [];
    let total = 0;
    const {
        prices = {},
        items = [],
        applied_store_credit = {},
        applied_reward_points = {},
        shipping_addresses = [],
        applied_extra_fee = {},
    } = dataCart;

    let {
        applied_giftcard = {},
    } = dataCart;

    if (modules.giftcard.useCommerceModule) {
        applied_giftcard = dataCart.applied_gift_cards;
    }

    if (dataCart && items) {
        let subtotal;
        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            subtotal = formatPrice(prices.subtotal_excluding_tax.value, prices.subtotal_excluding_tax.currency || globalCurrency);
        } else {
            subtotal = formatPrice(prices.subtotal_including_tax.value, prices.subtotal_including_tax.currency || globalCurrency);
        }
        total = prices.grand_total;
        const [shipping] = shipping_addresses;

        dataSummary.push({ item: 'Total', value: subtotal });

        let cartItemBySeller = {};

        if (items.length > 0) {
            const unGroupedData = items;

            // eslint-disable-next-line no-shadow, object-curly-newline
            const groupData = unGroupedData.reduce((groupData, { id, quantity, pickup_item_store_info, prices: pricesItem, product, ...others }) => {
                let item = groupData.find((p) => p.seller_id === product.seller.seller_id);
                if (!item) {
                    item = {
                        seller_id: product.seller.seller_id,
                        seller_name: product.seller.seller_name ? product.seller.seller_name : 'Default Seller',
                        productList: [],
                        subtotal: {
                            currency: '',
                            value: 0,
                        },
                    };
                    groupData.push(item);
                }
                let child = item.productList.find((ch) => ch.name === product.name);
                if (!child) {
                    child = {
                        id,
                        prices: pricesItem,
                        product,
                        quantity,
                        ...others,
                    };
                    item.productList.push(child);
                    item.subtotal.currency = pricesItem.row_total_including_tax.currency;
                    item.subtotal.value += pricesItem.row_total_including_tax.value;
                }
                return groupData;
            }, []);
            cartItemBySeller = groupData;
        }

        if (prices && prices.applied_taxes && prices.applied_taxes.length) {
            const taxes = prices.applied_taxes.reduce(
                (prev, curr) => ({
                    value: prev.value + curr.amount.value,
                    currency: curr.amount.currency,
                }),
                // eslint-disable-next-line comma-dangle
                { value: 0 }
            );
            const price = formatPrice(taxes.value, taxes.currency);
            dataSummary.push({ item: t('common:summary:tax'), value: price });
        }

        if (modules.checkout.extraFee.enabled && applied_extra_fee && applied_extra_fee.extrafee_value) {
            if (storeConfig.enable_oms_multiseller === '1') {
                dataSummary.push({
                    item: applied_extra_fee.title || '',
                    value: formatPrice(
                        applied_extra_fee.extrafee_value.value ? applied_extra_fee.extrafee_value.value : 0,
                        // eslint-disable-next-line comma-dangle
                        globalCurrency
                    ),
                });
            } else {
                dataSummary.push({
                    item: applied_extra_fee.title || '',
                    value: formatPrice(applied_extra_fee.extrafee_value.value ? applied_extra_fee.extrafee_value.value : 0, globalCurrency),
                });
            }
        }

        if (storeConfig.enable_oms_multiseller === '1') {
            const multiShipping = shipping_addresses;
            let totalShipping = 0;
            // eslint-disable-next-line array-callback-return
            multiShipping.map((ship) => {
                if (ship.selected_shipping_method) {
                    totalShipping += ship.selected_shipping_method.amount.value;
                }
            });
            const price = formatPrice(totalShipping, storeConfig.base_currency_code);
            dataSummary.push({ item: 'shipping', value: price });
        } else {
            if (shipping && shipping.selected_shipping_method) {
                const shippingMethod = shipping.selected_shipping_method;
                const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency);
                dataSummary.push({ item: 'shipping', value: price });
            }
        }
        if (prices && prices.discounts && prices.discounts.length) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(disc.amount.value, disc.amount.currency);
                return { item: `${disc.label}`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(discounts);
        }

        if (modules.storecredit.enabled) {
            let price = '';
            if (storeConfig.enable_oms_multiseller === '1') {
                if (modules.storecredit.useCommerceModule && applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
                    price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency);
                } else if (applied_store_credit.is_use_store_credit) {
                    price = formatPrice(Math.abs(applied_store_credit.store_credit_amount) * cartItemBySeller.length, globalCurrency);
                }
                if (price !== '') dataSummary.push({ item: `${t('common:summary:storeCredit')} `, value: `-${price}` });
            } else {
                if (modules.storecredit.useCommerceModule && applied_store_credit.applied_balance && applied_store_credit.applied_balance.value > 0) {
                    price = formatPrice(Math.abs(applied_store_credit.applied_balance.value), globalCurrency);
                } else if (applied_store_credit.is_use_store_credit) {
                    price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
                }
                if (price !== '') dataSummary.push({ item: `${t('common:summary:storeCredit')} `, value: `-${price}` });
            }
        }

        if (modules.rewardpoint.enabled && applied_reward_points.is_use_reward_points) {
            if (storeConfig.enable_oms_multiseller === '1') {
                const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
                dataSummary.push({ item: `${t('common:summary:rewardPoint')} `, value: `-${price}` });
            } else {
                const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
                dataSummary.push({ item: `${t('common:summary:rewardPoint')} `, value: `-${price}` });
            }
        }

        if (modules.giftcard.enabled && applied_giftcard) {
            let giftCards = [];
            if (modules.giftcard.useCommerceModule) {
                if (applied_giftcard && applied_giftcard.length > 0) {
                    giftCards = applied_giftcard.map((item) => {
                        const price = formatPrice(Math.abs(item.applied_balance.value), globalCurrency);
                        return { item: `${t('common:summary:giftCard')} (${item.code}) - ${price}`, value: `-${price}` };
                    });
                }
            } else {
                giftCards = applied_giftcard.giftcard_detail.map((item) => {
                    const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                    return { item: `${t('common:summary:giftCard')} (${item.giftcard_code}) - ${price}`, value: `-${price}` };
                });
            }
            dataSummary = dataSummary.concat(giftCards);
        }
    }

    if (isDesktop) {
        return (
            <DesktopView
                items={items}
                summary={{ total, data: dataSummary }}
                isDesktop={isDesktop}
                {...other}
                dataCart={dataCart}
            />
        );
    }

    return (
        <MobileView
            items={items}
            summary={{ total, data: dataSummary }}
            {...other}
            t={t}
            dataCart={dataCart}
        />
    );
};

CoreSummary.propTypes = {
    deleteCart: propTypes.func,
    updateCart: propTypes.func,
    withAction: propTypes.bool,
};

CoreSummary.defaultProps = {
    deleteCart: () => {},
    updateCart: () => {},
    withAction: false,
};

export default CoreSummary;
