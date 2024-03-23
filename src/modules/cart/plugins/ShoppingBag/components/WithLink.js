/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithLink = (props) => {
    const { cartData, handleLink } = props;

    return (
        <div
            className={cx('group hover:cursor-pointer')}
            onClick={handleLink}
        >
            <BadgeCounter value={cartData}>
                <ShoppingCartIcon
                    className={cx(
                        'mobile:max-tablet:w-[20px]',
                        'tablet:w-[24px]',
                        'text-neutral-400',
                        'hover:text-primary-700',
                        'group-hover:text-primary-700',
                        'mobile:max-tablet:mt-3',
                        'tablet:mt-3',
                        'hover:cursor-pointer',
                    )}
                />
            </BadgeCounter>
        </div>
    );
};

export default WithLink;
