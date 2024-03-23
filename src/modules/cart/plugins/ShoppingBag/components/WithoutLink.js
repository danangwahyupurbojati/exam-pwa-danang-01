import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithoutLink = ({ cartData = 0 }) => (
    <BadgeCounter value={cartData}>
        <ShoppingCartIcon className={cx('w-[24px]', 'text-neutral-600', 'mt-3')} />
    </BadgeCounter>
);

export default WithoutLink;
