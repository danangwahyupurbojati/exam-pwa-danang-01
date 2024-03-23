import React from 'react';
import cx from 'classnames';

const CustomWelcome = ({ title }) => (
    <div className={cx('relative', 'flex', 'justify-center', 'tablet:max-w-screen-tablet', 'desktop:max-w-screen-desktop', 'mx-auto')}>
        <div className={cx('slider-container', 'h-[45px]', 'overflow-hidden', 'text-center', 'p-[8px_25%]')}>
            {title}
        </div>
    </div>
);

export default CustomWelcome;
