/* eslint-disable operator-linebreak */
import Typography from '@common_typography';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const TheProduct = dynamic(() => import('@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Product'));

const MagezonProduct = (props) => {
    // prettier-ignore
    const {
        type, border_hover_color,
        description, show_line,
        line_color, line_position, line_width,
        title, title_align, title_tag, title_color,
    } = props;
    const showLineClass = show_line ? 'mgz-product-heading-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-product-heading-line--bottom' : '';
    const magezonProductRef = useRef();
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries?.length > 0 && entries[0].isIntersecting && !display) {
                setDisplay(true);
            }
        });

        if (magezonProductRef.current) {
            observer.observe(magezonProductRef.current);
        }

        return () => observer.disconnect();
    }, [magezonProductRef]);

    return (
        <>
            <div className={cx('mgz-product box-border')} ref={magezonProductRef}>
                {(title || description) && (
                    <div className={`mgz-product-heading ${showLineClass} ${linePosClass}`}>
                        {title && (
                            <div className="mgz-product-heading-title">
                                <Typography variant={title_tag} align={title_align}>
                                    {title.toUpperCase()}
                                </Typography>
                            </div>
                        )}
                        <div>{description}</div>
                    </div>
                )}
                {display ? <TheProduct {...props} /> : null}
            </div>
            <style jsx>
                {`
                    .mgz-product-heading {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-product-heading-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width}px;
                        background-color: ${line_color};
                    }
                    .mgz-product-heading-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-product-heading-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-product-heading-title :global(*[class*='Typography']) {
                        ${title_color ? `color: ${title_color};` : ''}
                    }
                    .mgz-product :global(.MuiGrid-item h4) {
                        ${type === 'product_list' &&
                        `
                            margin: 0;
                        `}
                    }
                    .mgz-product-content > :global(div) {
                        margin-bottom: 20px;
                    }
                    .mgz-product-content > :global(div:hover) {
                        ${type !== 'product_grid' &&
                        type !== 'product_slider' &&
                        `
                            box-shadow: 0px 20px 50px -20px rgb(0 0 0 / 50%) !important;
                            border: 1px solid ${border_hover_color || '#ffffff'} !important;
                        `}
                    }
                    .mgz-product :global(.swift-catalog-item-product:first-child) {
                        
                    }
                    .mgz-product-content :global(.mgz-single-product-card) {
                        padding: 20px 0;
                    }
                    .mgz-product-content :global(.mgz-single-product-card img) {
                        max-width: 100%;
                        cursor: pointer;
                    }
                    .mgz-product-error {
                        padding: 20px 0;
                    }
                `}
            </style>
        </>
    );
};
export default MagezonProduct;
