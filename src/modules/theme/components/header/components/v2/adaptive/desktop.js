/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from '@common_image';
import Typography from '@common_typography';
import /* config, */ { headerVersion } from '@config';

import Button from '@common_button';

import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';

import Drawer from '@common_drawer';
import Tabs from '@common_tabs';
import useMediaQuery from '@core/hooks/useMediaQuery';

const Autocomplete = dynamic(() => import('@core_modules/theme/components/header/components/autocomplete'), { ssr: true });
const Menu = dynamic(() => import('@core_modules/theme/components/header/components/v1/mcategory'), { ssr: true });
// const ProductCompareIcon = dynamic(() => import('@core_modules/catalog/plugins/ProductCompare'), { ssr: true });
const ShoppingBagIcon = dynamic(() => import('@plugin_shoppingbag'), { ssr: true });
// const NotificationBell = dynamic(() => import('@plugin_notificationbell'), { ssr: true });
const UserInfo = dynamic(() => import('@core_modules/theme/components/header/components/v1/adaptive/plugin/userinfo'), { ssr: false });
const BurgerMenuCategories = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/categories'), { ssr: false });
const BurgerMenuAccount = dynamic(() => import('@core_modules/theme/components/header/components/burgermenu/account'), { ssr: false });

const DesktopHeader = (props) => {
    const {
        //
        t,
        storeConfig,
        isLogin,
        customer,
        setValue,
        handleSearch,
        dataMenu,
        loadingMenu,
        handleLogout,
        deviceWidth,
        cmsMenu,
        ...other
    } = props;
    // const { modules } = config;
    const { isDesktop, isMobile } = useMediaQuery();
    const isHeaderV2 = headerVersion === 'v2';

    const logoDimensions = {
        width: storeConfig?.logo_width || (isDesktop ? 120 : 74),
        height: storeConfig?.logo_height || (isDesktop ? 52 : 34),
    };
    const logoAdditionalProps = {};
    if (!isMobile) {
        logoAdditionalProps.styleContainer = {
            width: `${logoDimensions.width}px`,
            height: `${logoDimensions.height}px`,
            paddingTop: 0,
        };
    }

    const [open, setOpen] = React.useState(false);
    const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);
    const [localOpen, setLocalOpen] = React.useState(false);
    const [isSearchShown, setIsSearchShown] = React.useState(false);

    // const [isZeroCompare, setIsZeroCompare] = React.useState(false);

    const handleClose = () => {
        setLocalOpen(false);
        setTimeout(() => {
            setOpenBurgerMenu(false);
        }, 500);
    };

    useEffect(() => {
        setLocalOpen(openBurgerMenu);
    }, [openBurgerMenu]);

    const filteredData = dataMenu?.categories?.items[0]?.children.filter((item) => item.include_in_menu !== 0);
    const burgerMenuData = [
        {
            title: 'Menu',
            content: dataMenu && <BurgerMenuCategories data={filteredData} cmsMenu={cmsMenu} />,
            type: 'react-component',
        },
        {
            title: 'Account',
            content: <BurgerMenuAccount isLogin={isLogin} handleLogout={handleLogout} {...other} />,
            type: 'react-component',
        },
    ];

    const PopoverContent = () => {
        return (
            <ul className={cx('my-account-list__wrapper')}>
                <li key={0} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left')}>
                    <Typography className={cx('currency-list__text', '!text-primary-700')}>
                        Hi,
                        {' '}
                        {customer?.firstname}
                    </Typography>
                </li>
                <li key={0} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/customer/account">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Account</Typography>
                    </Link>
                </li>
                <li key={1} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/wishlist">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>My Wish List</Typography>
                    </Link>
                </li>
                <li key={2} className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}>
                    <Link href="/catalog/product_compare">
                        <Typography className={cx('currency-list__text', 'text-neutral-700')}>Compare Products</Typography>
                    </Link>
                </li>
                <li
                    key={3}
                    className={cx('my-account-list__item', 'py-2', 'px-2', 'text-left', 'hover:cursor-pointer', 'hover:bg-neutral-100')}
                    onClick={() => handleLogout()}
                >
                    <Typography className={cx('currency-list__text', 'text-primary-700')}>Log Out</Typography>
                </li>
            </ul>
        );
    };

    return (
        <div className={cx('desktop-header', 'transition-transform', 'delay-300', 'duration-500', 'ease-in-out', 'shadow-md')}>
            <div className={cx('middle-header', 'tablet:border-b-[1.5px]', 'tablet:border-b-neutral-200', 'tablet:py-4')}>
                <div
                    className={cx(
                        'middle-header__wrapper',
                        'm-[0_auto]',
                        'flex',
                        'flex-row',
                        'justify-between',
                        'tablet:max-w-screen-tablet',
                        'desktop:gap-x-5',
                        'px-4',
                        'tablet:px-6',
                        'desktop:gap-x-6',
                        'desktop:max-w-screen-desktop',
                        'desktop:px-10',
                        'mobile:max-tablet:grid',
                        'mobile:max-tablet:grid-cols-[4fr_4fr]',
                        'mobile:max-tablet:max-w-[100%]',
                    )}
                >
                    <div className="flex flex-row gap-4">
                        {!isDesktop ? (
                            <div className={cx('middle-header-tablet__burger-menu', 'desktop:hidden')}>
                                <Button
                                    className={cx(
                                        'my-2',
                                        '!p-0',
                                        '!mx-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => {
                                        setOpenBurgerMenu(true);
                                    }}
                                    icon={<Bars3Icon />}
                                    iconProps={{ className: cx('text-neutral-700', 'w-[24px]', 'h-[24px]') }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                                {dataMenu && openBurgerMenu && (
                                    <Drawer
                                        open={localOpen}
                                        handleClose={handleClose}
                                        position="left"
                                        className={cx('mobile:max-tablet:w-[280px]', 'tablet:max-desktop:w-[396px]', 'desktop:w-[540px]', {
                                            'animate-hamburger-drawer-in': localOpen,
                                            'animate-hamburger-drawer-out': !localOpen,
                                        })}
                                        customButtonClose
                                        backdrop
                                    >
                                        <Tabs
                                            data={burgerMenuData}
                                            tabHasContent
                                            tabWrapperClassName={cx('border-none')}
                                            tabTitleWrapperClassName={cx('grid', 'grid-cols-2')}
                                            tabTitleClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                                            tabTitleActiveClassName={cx('border-none', '!text-neutral-700', 'text-2md', 'font-semibold')}
                                            tabTitleListClassName={cx('bg-neutral-100')}
                                            tabTitleListActiveClassName={cx('bg-neutral-white', 'border-b-[1px]', 'border-b-neutral-400')}
                                            tabContentClassName={cx('!pt-0', 'h-full', 'overflow-y-auto', 'overflow-x-hidden')}
                                        />
                                    </Drawer>
                                )}
                            </div>
                        ) : null}
                        <div
                            className={cx(
                                'middle-header__logo',
                                'desktop:basis-full',
                                'desktop:h-[44px]',
                                'tablet:flex',
                                'items-center',
                                'cursor-pointer',
                                'mobile:max-tablet:h-[34px]',
                                'mobile:max-tablet:w-[74px]',
                                'mobile:max-tablet:mt-2',
                                'mobile:max-tablet:relative',
                            )}
                        >
                            <Link href="/">
                                <Image
                                    className="header-middle__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    alt={storeConfig.default_title}
                                    {...logoDimensions}
                                    {...logoAdditionalProps}
                                    storeConfig={storeConfig}
                                />
                            </Link>
                            <div className="ml-8 flex flex-row menu-category mobile:max-desktop:hidden">
                                <div className="max-w-[800px]">
                                    <div className="xs:basis-full menu-middle w-max">
                                        <nav className={cx('menu-wrapper')} role="navigation">
                                            {loadingMenu
                                                ? <></>
                                                : (
                                                    <Menu
                                                        useOthers
                                                        t={t}
                                                        data={dataMenu}
                                                        cmsMenu={cmsMenu}
                                                        storeConfig={storeConfig}
                                                    />
)}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('middle-header__statusicon', 'desktop:flex flex-row')}>
                        <div className={cx('middle-header__statusicon__left-section', 'flex', 'flex-row', 'gap-x-3', 'justify-end item')}>
                            <div className="search-icon">
                                <Button
                                    className={cx(
                                        'mt-3',
                                        '!px-0',
                                        '!py-0',
                                        'hover:shadow-none',
                                        'focus:shadow-none',
                                        'active:shadow-none',
                                        'active:shadow-none',
                                    )}
                                    onClick={() => setIsSearchShown(!isSearchShown)}
                                    icon={<MagnifyingGlassIcon className="text-neutral-400" />}
                                    iconProps={{ className: cx('text-neutral-700', 'w-[24px]', 'h-[24px]') }}
                                    iconOnly
                                    variant="tertiary"
                                    classNameText={cx('!text-neutral-700')}
                                />
                            </div>
                            {/* {modules.productcompare.enabled && (
                                <div className={cx('product-compare', 'mobile:max-desktop:hidden', isZeroCompare ? '-ml-3' : '')}>
                                    <ProductCompareIcon setIsZeroCompare={setIsZeroCompare} showZeroValue={false} withLink isLogin={isLogin} />
                                </div>
                            )} */}
                            <div className={cx('notification', 'hidden desktop:inline')}>
                                {/* <NotificationBell withLink /> */}
                            </div>

                            <div
                                className={cx(
                                    'middle-header__statusicon__right-section__account',
                                    'mt-3',
                                    'hover:cursor-pointer',
                                    'justify-start',
                                    'group',
                                    '-ml-2 mr-1',
                                    'hidden tablet:flex',
                                )}
                            >
                                <UserInfo
                                    withLabel={false}
                                    withUsername={!isHeaderV2}
                                    t={t}
                                    isLogin={isLogin}
                                    customer={customer}
                                    open={open}
                                    setOpen={setOpen}
                                    PopoverContent={PopoverContent}
                                />
                            </div>
                            <div id="header-shoppingBag-icon" className={cx('shopping-bag')}>
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            </div>
                        </div>
                    </div>
                </div>
                {isSearchShown && !isMobile ? (
                    <div className={cx('bottom-header-mobile__search mt-4')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} />
                    </div>
                ) : null}
            </div>
            <div className={cx('bottom-header', 'tablet:max-w-screen-tablet', 'desktop:max-w-screen-desktop', 'm-[0_auto]', 'px-6')}>
                {isSearchShown && isMobile ? (
                    <div className={cx('bottom-header-mobile__search')}>
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} t={t} storeConfig={storeConfig} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default DesktopHeader;
