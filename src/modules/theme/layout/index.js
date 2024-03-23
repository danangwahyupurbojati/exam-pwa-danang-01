/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable max-len */

import { useApolloClient } from '@apollo/client';
import { storeConfigVar } from '@core/services/graphql/cache';
import cx from 'classnames';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import TagManager from 'react-gtm-module';
// eslint-disable-next-line object-curly-newline
import { basePath, custDataNameCookie, debuging, features, modules, headerVersion, footerVersion } from '@config';
import { createCompareList } from '@core_modules/product/services/graphql';
import Copyright from '@core_modules/theme/components/footer/desktop/components/copyright';
import { getCountCart } from '@core_modules/theme/services/graphql';
import { getCartId } from '@helper_cartid';
import { getHost } from '@helper_config';
import { getCookies, setCookies } from '@helper_cookies';
import { getAppEnv } from '@helpers/env';
import { frontendConfig } from '@helpers/frontendOptions';
import { localTotalCart } from '@services/graphql/schema/local';
import localFont from 'next/font/local';
import Script from 'next/script';
import { getLoginInfo } from '@helper_auth';
import supportsWebP from 'supports-webp';
import Typography from '@common/Typography';
import PageProgressLoader from '@common_pageprogress';
import { usePathname } from 'next/navigation';
import { routeWithAuth } from '@core/middlewares/route';
/**
 * Set font family using nextjs helper,
 * path property needs to be an absolute path
 */
const font = localFont({
    src: [
        {
            path: '../../../../public/assets/fonts/Inter-Regular.ttf',
            weight: '400',
        },
        {
            path: '../../../../public/assets/fonts/Inter-Medium.ttf',
            weight: '500',
        },
        {
            path: '../../../../public/assets/fonts/Inter-SemiBold.ttf',
            weight: '600',
        },
        {
            path: '../../../../public/assets/fonts/Inter-Bold.ttf',
            weight: '700',
        },
    ],
    variable: '--font-inter', // set the font css variable name, which we refer in tailwind.config.js
});

const Header = dynamic(() => import('@common_header'), { ssr: true });
const Toast = dynamic(() => import('@common_toast'), { ssr: false });
const Backdrop = dynamic(() => import('@common_backdrop'), { ssr: false });
const Dialog = dynamic(() => import('@common_dialog'), { ssr: false });
const GlobalPromoMessage = dynamic(() => import('@core_modules/theme/components/globalPromo'), { ssr: true });
// const BottomNavigation = dynamic(() => import('@common_bottomnavigation'), { ssr: false });
// const HeaderMobile = dynamic(() => import('@common_headermobile'), { ssr: false });
const ScrollToTop = dynamic(() => import('@common_scrolltotop'), { ssr: false });
const Footer = dynamic(() => import('@common_footer'), { ssr: true });
// const RestrictionPopup = dynamic(() => import('@common_restrictionPopup'), { ssr: false });
// const NewsletterPopup = dynamic(() => import('@core_modules/theme/components/newsletterPopup'), { ssr: false });
// const RecentlyViewed = dynamic(() => import('@core_modules/theme/components/recentlyViewed'), { ssr: false });

// CHAT FEATURES IMPORT
// const ChatContent = dynamic(() => import('@core_modules/customer/plugins/ChatPlugin'), { ssr: false });
// END CHAT FEATURES IMPORT

const Layout = (props) => {
    const {
        dataMenu,
        pageConfig = {},
        children,
        app_cookies,
        // CustomHeader = false,
        i18n,
        storeConfig = {},
        // isLogin,
        // headerProps = {},
        data = {},
        t,
        // onlyCms,
        withLayoutHeader = true,
        withLayoutFooter = true,
        // showRecentlyBar = false,
        isHomepage = false,
        isPdp = false,
        isCms = false,
        isPlp = false,
        isBdp = false,
        isBlp = false,
        isCheckout = false,
        // isLoginPage = false,
        // isShowChat = true,
        deviceType = {},
    } = props;
    const { ogContent = {}, schemaOrg = null, headerDesktop = true, footer = true } = pageConfig;
    const router = useRouter();
    const pathname = usePathname();
    const appEnv = getAppEnv();
    // login get From cookies
    const isLogin = getLoginInfo();
    const [hasWebpSupport, setHasWebpSupport] = useState(true);

    const [dialog, setDialog] = useState({
        open: false,
        title: null,
        content: null,
        positiveLabel: null,
        positiveAction: null,
        negativeLabel: null,
        negativeAction: null,
    });

    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: 'success',
            text: '',
            position: 'bottom-right',
            positionNumber: 0,
            duration: 3000,
            close: true,
        },
        backdropLoader: false,
    });

    const [, setRestrictionCookies] = useState(false);
    const [setCompareList] = createCompareList();
    const showGlobalPromo = features.globalPromo.enable;
    const frontendCache = storeConfigVar();

    // get app name config

    let appName = '';
    let installMessage = '';
    let showPopup = false;
    let iconAppleTouch = `${basePath}/assets/img/swiftpwa_apple_touch.png`;
    if (storeConfig && storeConfig.pwa) {
        iconAppleTouch = storeConfig.pwa.icon_apple_touch;
        appName = storeConfig.pwa.app_name;
        showPopup = storeConfig.pwa.custom_install_app_enable;
        installMessage = storeConfig.pwa.install_message || 'Install';
    }

    // const [mainMinimumHeight, setMainMinimumHeight] = useState(0);
    const refFooter = useRef(null);
    const refHeader = useRef(null);
    const client = useApolloClient();

    const handleSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handlerDialog = (params) => {
        setDialog({ ...dialog, ...params });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    // const handleRestrictionCookies = () => {
    //     setRestrictionCookies(true);
    //     setCookies('user_allowed_save_cookie', true);
    // };

    const allowHeaderCheckout = modules.checkout.checkoutOnly ? !modules.checkout.checkoutOnly : withLayoutHeader;

    const ogData = {
        'og:image:type': 'image/png',
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description || '';
    }

    if (!ogData['og:title']) {
        ogData['og:title'] = pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa' || '';
    }

    if (!ogData['og:image']) {
        ogData['og:image'] = storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}${basePath}/assets/img/swift-logo.png` || '';
    }

    if (!ogData['og:url']) {
        ogData['og:url'] = `${getHost()}${router.asPath}` || '';
    }

    if (!ogData['og:type']) {
        ogData['og:type'] = 'website';
    }

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.facebook_meta_id_app_id) {
        ogData['fb:app_id'] = storeConfig.pwa.facebook_meta_id_app_id;
    }

    if (pathname) {
        const allow = routeWithAuth(pathname);
        if (!allow && !isLogin && typeof window !== 'undefined') {
            router.push('/customer/account/login');
        }
    }

    React.useEffect(() => {
        if (!isLogin && modules.productcompare.enabled) {
            const uid_product = getCookies('uid_product_compare');
            if (!uid_product) {
                setCompareList({
                    variables: {
                        uid: [],
                    },
                })
                    .then(async (res) => {
                        setCookies('uid_product_compare', res.data.createCompareList.uid);
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                        });
                    });
            }
        }
    }, [isLogin, pathname]);

    const reloadCartQty = typeof window !== 'undefined' && window && window.reloadCartQty;
    let cartId = '';
    const [getCart, RespondCart] = getCountCart();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    useEffect(() => {
        if (RespondCart && RespondCart.data) {
            client.writeQuery({
                query: localTotalCart,
                data: { totalCart: RespondCart.data.cart.total_quantity },
            });
        }
    }, [RespondCart]);

    useEffect(() => {
        if (reloadCartQty && cartId) {
            // query get cart
            getCart({
                variables: {
                    cartId,
                },
            });
            window.reloadCartQty = false;
        }
    }, [reloadCartQty]);

    useEffect(() => {
        const isRestrictionMode = getCookies('user_allowed_save_cookie');
        if (isRestrictionMode) {
            setRestrictionCookies(isRestrictionMode);
        }
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            window.dialog = handlerDialog;
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    pageType: pageConfig.pageType || 'other',
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) {
                // const custEmail = custData.email.toLowerCase();
                // tagManagerArgs.dataLayer.eid = crypto.createHash('sha256').update(custEmail).digest('hex');
            }
            if (custData && custData.phonenumber && custData.is_phonenumber_valid) {
                // let custPhone = custData.phonenumber;
                // custPhone = `${custPhone}`;
                // tagManagerArgs.dataLayer.pid = crypto.createHash('sha256').update(custPhone).digest('hex');
            }
            TagManager.dataLayer(tagManagerArgs);
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);

        if (typeof window !== 'undefined') {
            supportsWebP.then((supported) => {
                if (!supported) {
                    setHasWebpSupport(false);
                }
            });
        }
    }, []);

    const styles = {
        marginTop: !isHomepage && !isPdp ? '55px' : 0,
    };

    const generateClasses = () => {
        let classes = `${
            !isCms && (router.pathname !== '/' || (router.pathname === '/' && modules.checkout.checkoutOnly))
                ? 'desktop:max-w-screen-desktop min-h-[350px] desktop:px-10 tablet:max-w-screen-tablet tablet:px-6 mobile:px-4 my-0 mx-auto'
                : ''
        } ${font.variable} font-sans !font-pwa-default mb-0 ${isPdp ? 'mobile:!px-0 tablet:!px-6 desktop:!px-10' : ''}`;

        if (!isHomepage && !isPdp) {
            classes += ' mt-[40px]';
        } else {
            classes += ' xs:mt-6 xl:mt-10';
        }

        if (isCheckout) {
            classes += ' !mt-0 !px-0 tablet:!mt-0 desktop:!mt-0 relative';
        }

        return classes;
    };

    if (!headerDesktop) {
        styles.marginTop = 0;
    }

    useEffect(() => {
        if (storeConfig && storeConfig.pwa && typeof window !== 'undefined') {
            const pwaConfig = frontendCache.pwa;

            const stylesheet = document.createElement('style');
            const fontStylesheet = document.createElement('link');
            const fontStylesheetHeading = document.createElement('link');

            if (pwaConfig) {
                if (pwaConfig.default_font && pwaConfig.default_font !== '0') {
                    fontStylesheet.href = `https://fonts.googleapis.com/css2?family=${pwaConfig.default_font.replace(
                        ' ',
                        '-',
                    )}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap`;
                    fontStylesheet.id = 'font-stylesheet-id';
                    fontStylesheet.rel = 'stylesheet';
                }
                if (pwaConfig.heading_font && pwaConfig.heading_font !== '0') {
                    fontStylesheetHeading.href = `https://fonts.googleapis.com/css2?family=${pwaConfig.heading_font.replace(
                        ' ',
                        '-',
                    )}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap`;
                    fontStylesheetHeading.id = 'font-stylesheet-id';
                    fontStylesheetHeading.rel = 'stylesheet';
                }
                stylesheet.innerHTML = frontendConfig(pwaConfig);
                stylesheet.id = 'frontend-options-stylesheet';
                if (!document.getElementById('frontend-options-stylesheet') && !document.getElementById('font-stylesheet-id')) {
                    document.head.appendChild(fontStylesheet);
                    document.head.appendChild(fontStylesheetHeading);
                    document.head.appendChild(stylesheet);
                }
            }
        }
    }, [storeConfig]);

    let metaDescValue = ogData['og:description'];
    let metaTitleValue = ogData['og:title'];
    let metaKeywordValue = pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa';

    if (isPlp) {
        metaDescValue = data && data?.meta_description ? data?.meta_description : ogData['og:description'];
        metaTitleValue = data && data?.meta_title ? data?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data?.meta_keywords ? data?.meta_keywords : '';
    }
    if (isPdp) {
        metaDescValue = data && data.products?.items[0].meta_description ? data.products?.items[0].meta_description : ogData['og:description'];
        metaTitleValue = data && data.products?.items[0].meta_title ? data.products?.items[0].meta_title : ogData['og:title'];
        metaKeywordValue = data && data.products?.items[0].meta_keyword ? data.products?.items[0].meta_keyword : '';
    }
    if (isCms) {
        metaDescValue = data && data.cmsPage?.meta_description ? data.cmsPage?.meta_description : ogData['og:description'];
        metaTitleValue = data && data.cmsPage?.meta_title ? data.cmsPage?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data.cmsPage?.meta_keywords ? data.cmsPage?.meta_keywords : '';
    }
    if (isBdp) {
        metaDescValue = data && data?.meta_description ? data?.meta_description : ogData['og:description'];
        metaTitleValue = data && data?.meta_title ? data?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data?.meta_keywords ? data?.meta_keywords : '';
    }
    if (isBlp) {
        const dataBlp = data?.getBlogCategory?.data[0];
        metaDescValue = data && dataBlp.meta_description ? dataBlp.meta_description : ogData['og:description'];
        metaTitleValue = data && dataBlp.meta_title ? dataBlp.meta_title : ogData['og:title'];
        metaKeywordValue = data && dataBlp.meta_keywords ? dataBlp.meta_keywords : '';
    }

    const canonicalUrl = `${getHost()}${router.asPath}`;
    const defaultLang = i18n && i18n.language === 'id' ? 'id_ID' : 'en_US';
    const pageNameSelector = pageConfig?.tagSelector ?? 'swift-page-default';

    return (
        <>
            <Head>
                <meta name="keywords" content={metaKeywordValue} />
                <meta name="robots" content={appEnv === 'prod' && storeConfig.pwa ? storeConfig.pwa.default_robot : 'NOINDEX,NOFOLLOW'} />
                <link rel="manifest" href={`${basePath}/manifest.json`} />
                <link rel="apple-touch-icon" href={iconAppleTouch} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="title" content={metaTitleValue} />
                <meta name="description" content={metaDescValue} />
                {Object.keys(ogData).map((key, idx) => {
                    let valueWithMeta = ogData[key];
                    if (key === 'og:description') {
                        valueWithMeta = metaDescValue;
                    }
                    if (key === 'og:title') {
                        valueWithMeta = metaTitleValue;
                    }
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        valueWithMeta = ogData[key].value;
                        if (key === 'description') {
                            valueWithMeta = metaDescValue;
                        }
                        if (key === 'title') {
                            valueWithMeta = metaTitleValue;
                        }
                        return <meta name={`${key}`} content={valueWithMeta} key={idx} />;
                    }
                    return <meta property={`${key}`} content={valueWithMeta} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}</title>
                {schemaOrg
                    ? schemaOrg.map((val, idx) => (
                          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                      ))
                    : null}
                <link
                    rel="canonical"
                    href={canonicalUrl.substring(0, canonicalUrl.indexOf('?') !== -1 ? canonicalUrl.indexOf('?') : canonicalUrl.length)}
                />
                <link
                    rel="alternate"
                    hrefLang={defaultLang}
                    href={canonicalUrl.substring(0, canonicalUrl.indexOf('?') !== -1 ? canonicalUrl.indexOf('?') : canonicalUrl.length)}
                />
            </Head>
            {/* {showPopup && storeConfig && storeConfig.pwa && storeConfig.pwa.header_version !== 'v2' ? (
                <PopupInstallAppMobile appName={appName} installMessage={installMessage} />
            ) : null} */}
            <div className={pageNameSelector}>
                <PageProgressLoader />
                {allowHeaderCheckout && (
                    <header ref={refHeader} className={cx(`header-${headerVersion}`, font.variable, 'font-sans', '!font-pwa-default')}>
                        <GlobalPromoMessage
                            t={t}
                            storeConfig={storeConfig}
                            showGlobalPromo={showGlobalPromo}
                            appName={appName}
                            installMessage={installMessage}
                        />
                        <Header
                            t={t}
                            pageConfig={pageConfig}
                            storeConfig={storeConfig}
                            isLogin={isLogin}
                            app_cookies={app_cookies}
                            showGlobalPromo={showGlobalPromo}
                            enablePopupInstallation={showPopup}
                            appName={appName}
                            installMessage={installMessage}
                            dataMenu={dataMenu}
                            isHomepage={isHomepage}
                            deviceType={deviceType}
                            i18n={i18n}
                        />
                    </header>
                )}
                <main className={generateClasses()}>
                    <Backdrop open={state.backdropLoader} />
                    <Dialog
                        open={dialog.open}
                        title={dialog.title}
                        content={dialog.content}
                        positiveLabel={dialog.positiveLabel}
                        positiveAction={dialog.positiveAction}
                        negativeLabel={dialog.negativeLabel}
                        negativeAction={dialog.negativeAction}
                    />
                    <Toast
                        close={state.toastMessage.close}
                        setOpen={handleCloseMessage}
                        open={state.toastMessage.open}
                        variant={state.toastMessage.variant}
                        message={state.toastMessage.text}
                        position={state.toastMessage.position}
                        positionNumber={state.toastMessage.positionNumber}
                        autoHideDuration={state.toastMessage.duration}
                    />
                    {/* {!isHomepage && storeConfig.weltpixel_newsletter_general_enable === '1' && (
                    <NewsletterPopup t={t} storeConfig={storeConfig} pageConfig={pageConfig} isLogin={isLogin} />
                )} */}
                    {children}
                </main>

                {/* CHAT FEATURES */}
                {/* {features.chatSystem.enable && isShowChat && (
                <div className={bodyStyles.chatPlugin}>
                    {isLogin ? (
                        <ChatContent />
                    ) : (
                        <Fab
                            color="primary"
                            size="medium"
                            onClick={() => router.push(`${getHost()}/customer/account/login`)}
                            className={bodyStyles.buttonChat}
                        >
                            <ChatIcon className={bodyStyles.chatIcon} />
                        </Fab>
                    )}
                </div>
            )} */}
                {/* END CHAT FEATURES */}

                {withLayoutFooter && (
                    <footer className={cx(`${footerVersion}`, '!block', 'mt-[50px]', font.variable, 'font-sans', '!font-pwa-default')} ref={refFooter}>
                        {footer ? <Footer storeConfig={storeConfig} t={t} /> : null}
                        <Copyright storeConfig={storeConfig} t={t} />
                    </footer>
                )}
                {/* {storeConfig.cookie_restriction && !restrictionCookies && (
                <RestrictionPopup handleRestrictionCookies={handleRestrictionCookies} restrictionStyle={bodyStyles.cookieRestriction} />
            )}
            {showRecentlyBar && !onlyCms && (
                <RecentlyViewed
                    isActive={storeConfig && storeConfig.weltpixel_RecentlyViewedBar_general_enable}
                    recentlyBtn={bodyStyles.recentView}
                    wrapperContent={bodyStyles.recentlyWrapperContent}
                    recentlyBtnContent={bodyStyles.recentlyBtnContent}
                    contentFeatured={bodyStyles.contentFeatured}
                    className={bodyStyles.itemProduct}
                />
            )} */}

                <ScrollToTop
                    deviceType={deviceType}
                    showGlobalPromo={showGlobalPromo}
                    {...props}
                    className={
                        !hasWebpSupport ? 'bottom-10' : ''
                    }
                />
                {!hasWebpSupport ? (
                    <div className="fixed bottom-0 flex flex-col w-full z-scroll-to-top-1">
                        <div className="bg-yellow w-full">
                            <Typography
                                variant="h2"
                                className={cx(
                                    '!text-neutral-white',
                                    '!text-sm',
                                    'p-1',
                                    font.variable,
                                    'font-sans',
                                    '!font-pwa-default',
                                    'text-center',
                                    'font-normal',
                                    '!leading-base',
                                )}
                            >
                                {t('common:error:webpNotSupported')}
                            </Typography>
                        </div>
                    </div>
                ) : null}
                <Script src="/install.js" defer />
            </div>
        </>
    );
};

export default Layout;
