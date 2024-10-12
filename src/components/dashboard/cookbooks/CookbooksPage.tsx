import useGetCookbooks from '@/hooks/cookbook/useGetCookbooks';
import CookbookCard from './components/CookbookCard';
import useVirtualization from '@/hooks/common/useVirtualization.hook';
import { ICookbook } from '@/types';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Fragment } from 'react/jsx-runtime';
import CreateCookbookButton from './components/CreateCookbookButton';
import { FC } from 'react';

type ICookbookSkeletonProps = {
    left: number;
    top: number;
}

const CookbookSkeleton: FC<ICookbookSkeletonProps> = ({
    left,
    top,
}) => {
    return (
        <div className='skeleton w-48 h-48'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translateX(${left}px) translateY(${top}px)`
            }}
        >
        </div>
    )
}

const CookbooksPage = () => {

    // Get cookbooks.
    const {
        cookbooks,
        isLoadingCookbooks,
        lastElementRef,
        isFetchingNextPage,
        hasNextPage,
    } = useGetCookbooks();

    // Virtualization
    const {
        scrollParentRef,
        totalListHeight,
        totalListWidth,
        virtualRows,
        virtualColumns,
        columns,
    } = useVirtualization<ICookbook>({
        items: cookbooks,
        itemHeight: 192,
        itemWidth: 192,
        isGrid: true,
        hasNextPage,
        isLoading: isLoadingCookbooks,
    });



    // Return
    return (
        <div className="flex justify-start items-center flex-col gap-4 w-full h-full overflow-hidden px-2">

            {/* HEADER */}
            <div className="w-full flex justify-between items-center flex-wrap gap-2">
                {/* TITLE */}
                <h2 className="text-xl font-bold text-white">
                    Cookbooks
                </h2>

                {/* CREATE COOKBOOK BUTTON */}
                <CreateCookbookButton />
            </div>

            {/* LIST OF COOKBOOKS */}
            {
                cookbooks && cookbooks.length === 0 ? (
                    <div className='h-full flex justify-center items-center flex-col gap-4 mb-32'>

                        <LibraryBooksIcon
                            style={{
                                fontSize: 70,
                            }}
                            className='bg-gray-800 rounded-lg p-1'
                        />

                        <p>First, let's give your new recipe a title!</p>

                        <CreateCookbookButton />

                    </div>
                ) :
                    <div
                        className='w-full gap-4 overflow-auto no-scrollbar'
                        ref={scrollParentRef}
                    >

                        <div
                            style={{
                                height: `${totalListHeight}px`,
                                width: `${totalListWidth}px`,
                                position: 'relative',
                            }}
                            className='flex flex-wrap flex-row justify-start items-start'
                        >

                            {
                                virtualRows.map((virtualRow) => {

                                    return (
                                        <Fragment key={`cookbook_virtualized_row_${virtualRow.index}`}>

                                            {
                                                virtualColumns.map((virtualColumn) => {

                                                    const idx = virtualRow.index * columns + virtualColumn.index;

                                                    if (!cookbooks || idx >= cookbooks.length) {

                                                        if (isFetchingNextPage) {

                                                            return (
                                                                <CookbookSkeleton
                                                                    key={`cookbook_skeleton_${virtualRows.length + idx}`}
                                                                    left={virtualColumn?.start + (10 * virtualColumn.index)}
                                                                    top={virtualRow?.start + (10 * virtualRow.index)}
                                                                />
                                                            )
                                                        } else {
                                                            return null;
                                                        }

                                                    }

                                                    const cookbook = cookbooks![idx];
                                                    const key = `cookbook_${cookbook!.id}`;

                                                    return (
                                                        <CookbookCard
                                                            key={key}
                                                            cookbook={cookbook}
                                                            lastElementRef={lastElementRef}
                                                            virtualColumn={virtualColumn}
                                                            virtualRow={virtualRow}
                                                        />
                                                    )

                                                })
                                            }

                                        </Fragment>
                                    )

                                })
                            }

                        </div>
                    </div>

            }

        </div>
    )
};

export default CookbooksPage;