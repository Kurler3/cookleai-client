import useGetCookbooks from '@/hooks/cookbook/useGetCookbooks';
import CookbookCard from './components/CookbookCard';
import useVirtualization from '@/hooks/common/useVirtualization.hook';
import { ICookbook } from '@/types';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Fragment } from 'react/jsx-runtime';
import CreateCookbookButton from './components/CreateCookbookButton';


const CookbooksPage = () => {

    // Get cookbooks.
    const {
        cookbooks,
        isLoadingCookbooks,
        lastElementRef,
        isFetchingNextPage,
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
                isLoadingCookbooks || !cookbooks ? (
                    <div className="w-full h-full flex justify-center items-center">
                        {/* //TODO: Loading skeletons */}
                        Loading...
                    </div>
                ) : cookbooks.length === 0 ? (
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
                                        </Fragment>
                                    )

                                })
                            }

                        </div>
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


            {/* ADD COOKBOOK MODAL */}


        </div>
    )
};

export default CookbooksPage;