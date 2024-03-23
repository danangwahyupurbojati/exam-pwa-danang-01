import React from 'react';
import Button from '@common_button';
import Show from '@common_show';
import cx from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ContainerScroll = ({
    variant = 'horizontal',
    className,
    classNameContainer,
    children,
    maxHeight = '100%',
    maxWidth = '100%',
    showArrow,
    arrowSize = 10,
    slidesToScroll = 1,
    style,
    arrowProps = {},
}) => {
    const containerRef = React.useRef(null);
    const isHorizontal = variant === 'horizontal';
    const isVertical = variant === 'vertical';
    const marginSize = 12;
    // calculates the width of the first child from the list rendered
    const [containerChildrenWidth, setContainerChildrenWidth] = React.useState(0);

    const { leftNavClassName = '', rightNavClassName = '' } = arrowProps;

    const onClickArrowLeft = () => {
        containerRef.current.scrollLeft -= containerChildrenWidth;
    };

    const onClickArrowRight = () => {
        containerRef.current.scrollLeft += containerChildrenWidth;
    };

    React.useEffect(() => {
        if (containerRef?.current?.children?.length > 0) {
            setContainerChildrenWidth((containerRef.current.children[0].clientWidth + marginSize) * slidesToScroll);
        }
    }, [containerRef, children]);

    return (
        <div
            className={cx('container-scroll flex flex-col relative group/container-scroll h-auto', classNameContainer)}
            style={{
                ...(maxHeight ? { maxHeight } : null),
                ...(maxWidth ? { maxWidth } : null),
                ...style,
            }}
        >
            <Show when={showArrow}>
                <div
                    className={cx(
                        'mobile:hidden tablet:flex desktop:flex', 'pointer-events-none',
                        'container-scroll-arrow flex justify-between w-[100%]',
                        'px-[5px]',
                        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                        'opacity-0',
                        'group-hover/container-scroll:opacity-100',
                        'z-[1]',
                        'pointer-events-none',
                        'order-0',
                        arrowProps.className || '',
                    )}
                >
                    <Button
                        variant="plain"
                        className={cx(
                            'container-scroll-arrow-left',
                            // 'bg-neutral-white',
                            '!bg-[#12121266]',
                            '!px-[10px]',
                            'pointer-events-auto',
                            '!rounded-[50%]',
                            'shadow-md',
                            'group/left-nav',
                            leftNavClassName,
                        )}
                        classNameText="!text-neutral group-hover/left-nav:!text-primary"
                        onClick={onClickArrowLeft}
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-neutral-white" style={{ width: arrowSize, height: arrowSize }} />
                    </Button>
                    <Button
                        variant="plain"
                        className={cx(
                            'container-scroll-arrow-right',
                            // 'bg-neutral-white',
                            '!bg-[#12121266]',
                            '!px-[10px]',
                            'pointer-events-auto',
                            '!rounded-[50%]',
                            'shadow-md',
                            'group/right-nav',
                            rightNavClassName,
                        )}
                        classNameText="!text-neutral group-hover/right-nav:!text-primary"
                        onClick={onClickArrowRight}
                    >
                        <ChevronRightIcon className="w-6 h-6 text-neutral-white" style={{ width: arrowSize, height: arrowSize }} />
                    </Button>
                </div>
            </Show>
            <div
                ref={containerRef}
                style={{
                    ...(maxHeight ? { maxHeight } : null),
                    ...(maxWidth ? { maxWidth } : null),
                }}
                className={cx(
                    'w-full',
                    'swift-container-scroll-data',
                    'relative',
                    'scrollbar-none',
                    'pb-4',
                    isHorizontal && 'overflow-x-auto flex scroll-smooth',
                    isVertical && 'overflow-y-auto',
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default ContainerScroll;
