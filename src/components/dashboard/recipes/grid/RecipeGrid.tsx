import { IRecipe } from "@/types";
import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";
import { VirtualItem } from "@tanstack/react-virtual";
import { RefObject } from "react";

type IProps = {
    recipes?: IRecipe[];
    isLoadingRecipes: boolean;
    isFetchingNextPage: boolean;
    lastElementRef: (node: HTMLDivElement) => void;
    virtualRows: VirtualItem[];
    virtualColumns: VirtualItem[];
    totalListHeight: number;
    totalListWidth: number;
    scrollParentRef: RefObject<HTMLDivElement>;
    columns: number;
}

const RecipeGrid: React.FC<IProps> = ({
    isLoadingRecipes,
    recipes,
    isFetchingNextPage,
    lastElementRef,
    totalListHeight,
    totalListWidth,
    virtualRows,
    virtualColumns,
    scrollParentRef,
    columns,
}) => {

    return (
        <div className="w-full overflow-x-auto overflow-y-auto relative h-full flex-wrap no-scrollbar" ref={scrollParentRef}>

            {
                isLoadingRecipes ? (
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                ) : (
                    <div
                        style={{
                            height: `${totalListHeight}px`,
                            width: `${totalListWidth}px`,
                            position: 'relative',
                        }}
                        className="flex flex-wrap flex-row justify-start items-start transition"
                    >

                        {
                            virtualRows.map((virtualRow) => {

                                return (
                                    <>

                                        {
                                            virtualColumns.map((virtualColumn) => {

                                                const idx = virtualRow.index * columns + virtualColumn.index;

                                                if(idx >= recipes!.length) return null;

                                                const recipe = recipes?.[idx];
                                                const key = `recipe_card_${recipe!.id}`;

                                                return (
                                                    <RecipeCard
                                                        key={key}
                                                        recipe={recipe!}
                                                        lastElementRef={idx === recipes!.length - 1 ? lastElementRef : undefined}
                                                        virtualColumn={virtualColumn}
                                                        virtualRow={virtualRow}
                                                    />
                                                );

                                            })
                                        }

                                    </>
                                )

                            })
                        }

                    </div>
                )

            }
        
            {
                isFetchingNextPage && (
                    Array.from({ length: 3 }).map((_, idx) => (
                        <RecipeCardSkeleton key={`recipe_list_card_${idx}`} />
                    ))
                )
            }
        </div>
    )
}

export default RecipeGrid;