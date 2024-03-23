import Backdrop from '@common_backdrop';
import Badge from '@common_badge';
import { useTranslation } from 'next-i18next';

import cx from 'classnames';
import Link from 'next/link';
import { footerVersion } from '@config';

const Copyright = (props) => {
    const { loading, error, storeConfig } = props;
    const { t } = useTranslation(['common']);

    const version = footerVersion;

    if (error) {
        return <Badge danger>{t('common:error:fetchError')}</Badge>;
    }
    if (loading) return <Backdrop open={loading} />;

    return (
        <div className={cx(
            'copyright',
            'text-center',
            'p-[10px]',
            'pt-8',
            'pb-6',
            'bg-neutral-700',
            'flex flex-col gap-2 desktop:flex-row desktop:gap-4',
            'justify-center items-center',
        )}
        >
            <span className={cx(
                'text-base', 'font-normal', 'leading-5', 'text-neutral-500 desktop:text-neutral-400',
            )}
            >
                {storeConfig.copyright}
            </span>
            {
                version === 'pwa_footer_v2' ? (
                    <div className="flex flex-row gap-4">
                        <Link href="/privacy-policy-cookie-restriction-mode">
                            <span className={cx('text-base', 'font-normal', 'leading-5', 'text-neutral-200', 'cursor-pointer')}>
                                {t('common:label:privacyPolicy')}
                            </span>
                        </Link>
                        <Link href="/privacy-policy-cookie-restriction-mode">
                            <span className={cx('text-base', 'font-normal', 'leading-5', 'text-neutral-200', 'cursor-pointer')}>
                                {t('common:label:termCondition')}
                            </span>
                        </Link>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Copyright;
