import Backdrop from '@common_backdrop';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import cx from 'classnames';

const CmsPage = (props) => {
    const {
        data, t, loading, error, storeConfig, onlyCms, ...other
    } = props;

    const isPageBuilder = data?.cmsPage?.content?.includes('[mgz_pagebuilder]');
    if (error) {
        return (
            <div className="alert m-15" severity="error">
                {t('common:error:fetchError')}
            </div>
        );
    }

    if (loading) return <Backdrop open={loading} />;
    if (onlyCms) return <CmsRenderer {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />;

    return (
        <div className={cx(
            'cms-container',
            '[&>.mgz-element.inline-block]:px-[40px]',
            !isPageBuilder ? `desktop:max-w-screen-desktop tablet:max-w-screen-tablet 
                        min-h-[350px] desktop:px-10 tablet:px-6 mobile:px-4 my-0 mx-auto` : '',
        )}
        >
            <CmsRenderer applyProse {...other} t={t} content={data.cmsPage.content} storeConfig={storeConfig} />
        </div>
    );
};

export default CmsPage;
