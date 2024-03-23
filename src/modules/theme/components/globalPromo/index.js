/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import CustomWelcome from '@core_modules/theme/components/globalPromo/custom-welcome';

const GlobalPromoMessage = (props) => {
    const {
        // prettier-ignore
        storeConfig,
        ...other
    } = props;

    if (storeConfig?.welcome) {
        return (
            <>
                <div
                    id="global-promo-message"
                    className={cx(
                        'global-promo-message',
                        'h-[38px]',
                        'text-center',
                        'font-normal',
                        'tablet:text-base',
                        'mobile:max-tablet:text-sm',
                        'bg-primary-700',
                        'text-neutral-white',
                        'mobile:max-tablet:py-1',
                    )}
                >
                    <CustomWelcome title={storeConfig.welcome} />
                </div>
            </>
        );
    }

    return null;
};

export default GlobalPromoMessage;
