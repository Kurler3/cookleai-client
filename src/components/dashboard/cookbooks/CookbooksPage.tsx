import useGetCookbooks from '@/hooks/cookbook/useGetCookbooks';
import AddIcon from '@mui/icons-material/Add';
import CookbookCard from './components/CookbookCard';
import useVirtualization from '@/hooks/common/useVirtualization.hook';
import { ICookbook } from '@/types';
import React from 'react';


const CookbooksPage = () => {

    // Get cookbooks.
    const {
        cookbooks,
        isLoadingCookbooks,
        errorWhileGettingCookbooks,
        lastElementRef,
        isFetchingNextPage,
    } = useGetCookbooks();

    //TODO If there was an error => redirect to error catcher.


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
    });




    return (
        <div className="flex justify-start items-center flex-col gap-4 w-full h-full overflow-hidden px-2">

            {/* HEADER */}
            <div className="w-full flex justify-between items-center flex-wrap gap-2">
                {/* TITLE */}
                <h2 className="text-xl font-bold text-white">
                    Cookbooks
                </h2>

                {/* CREATE COOKBOOK BUTTON */}
                <button
                    className="common_btn"
                >
                    {/* ADD ICON */}
                    <AddIcon />

                    Create Cookbook
                </button>
            </div>

            {/* LIST OF COOKBOOKS */}
            {
                isLoadingCookbooks ? (
                    <div className="w-full h-full flex justify-center items-center">
                        {/* //TODO: Loading skeletons */}
                        Loading...
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
                                        <React.Fragment key={`cookbook_virtualized_row_${virtualRow.index}`}>
                                            {
                                                virtualColumns.map((virtualColumn) => {

                                                    const idx = virtualRow.index * columns + virtualColumn.index;

                                                    if (idx >= cookbooks!.length) return null;

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
                                        </React.Fragment>
                                    )

                                })
                            }

                        </div>
                        {/* {cookbooks?.map((cookbook) => {
                            return (
                                <CookbookCard
                                    key={`cookbook_${cookbook.id}`}
                                    cookbook={cookbook}
                                    lastElementRef={lastElementRef}
                                />
                            )
                        })} */}
                    </div>

            }

            {/* IF IS FETCHING NEXT PAGE */}
            {
                isFetchingNextPage && (
                    <div className="w-full h-full flex justify-center items-center">
                        Loading MORE...
                    </div>
                )
            }

        </div>
    )
};

export default CookbooksPage;