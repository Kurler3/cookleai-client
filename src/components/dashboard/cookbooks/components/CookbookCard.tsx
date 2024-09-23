import { ICookbook } from "@/types";
import { FC, LegacyRef, useMemo } from "react";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import { Link } from "react-router-dom";
import getRoleColor from "@/utils/functions/getRoleColor";
import { VirtualItem } from "@tanstack/react-virtual";
import getVirtualizedGridItemStyles from "@/utils/functions/getVirtualizedGridItemStyles";

type IProps = {
    cookbook: ICookbook;
    lastElementRef?: (node: HTMLDivElement) => void;
    virtualRow?: VirtualItem;
    virtualColumn: VirtualItem;
}

const CookbookCard: FC<IProps> = ({
    cookbook,
    lastElementRef,
    virtualColumn,
    virtualRow,
}) => {

    // Get first recipe of a cookbook.
    const img = useMemo(() => {
        if (cookbook.recipes && cookbook.recipes.length > 0) {
            return cookbook.recipes[0].image ?? recipePlaceholderImg
        }
        return recipePlaceholderImg;
    }, [cookbook.recipes]);

    return (
        <Link
            className="w-48 h-48 max-w-48 bg-base-300 rounded-md flex justify-center items-start flex-col p-4 hover:bg-base-100"
            ref={lastElementRef as LegacyRef<HTMLAnchorElement> | undefined}
            to={`/cookbooks/${cookbook.id}`}
            style={virtualColumn && virtualRow && getVirtualizedGridItemStyles({
                virtualColumn,
                virtualRow
            })}
        >

            {/* FIRST RECIPE IMAGE */}
            <figure className="w-full flex justify-center items-center">
                <img src={img} alt={cookbook.title} className="h-28 w-28 rounded object-cover" />
            </figure>

            {/* COOKBOOK TITLE */}
            <p className="truncate text-white">
                {
                    cookbook.title
                }
            </p>

            <div className="flex justify-between items-center w-full">

                {/* RECIPES COUNT */}
                {
                    cookbook._count?.recipes !== undefined && (
                        <div className="text-xs">
                            {cookbook._count?.recipes} recipes
                        </div>
                    )
                }

                {/* ROLE IN COOKBOOK */}
                <div className={`text-xs ${getRoleColor(cookbook.role)} font-bold`}
                >
                    {cookbook.role?.toLowerCase()}
                </div>
            </div>

        </Link>
    )
};

export default CookbookCard;