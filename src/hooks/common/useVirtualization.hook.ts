import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";


type IUseVirtualizationInput<T> = {
    itemHeight: number;
    itemWidth?: number;
    items?: T[];
    isLoading?: boolean;
    overscan?: number;
    isGrid?: boolean;
    hasNextPage?: boolean;
}


const useVirtualization = <T>({
    itemHeight,
    itemWidth,
    items,
    isLoading,
    hasNextPage,
    overscan = 5,
    isGrid = false,
}: IUseVirtualizationInput<T>) => {

    const [columns, setColumns] = useState<number>(1);

    const scrollParentRef = useRef<HTMLDivElement>(null)

    const rowsCount = useMemo(() => {

        // If there is no items and is loading first time => show 2 rows.
        if(!items && isLoading) {
            return 2;
        }

        if(!items) return 0;

        // If has items
        if(items) {
            if(isGrid) {
                return Math.ceil(items.length / columns) + (hasNextPage ? 2 : 0);
            } else {
                return items.length;
            }
        }
        
        return 0;

    }, [columns, hasNextPage, isGrid, isLoading, items]);

    // Row virtualizer. Can be used for simple table or for grid.
    const rowVirtualizer = useVirtualizer({
        count: rowsCount,
        getScrollElement: () => scrollParentRef.current,
        estimateSize: () => itemHeight,
        overscan,
    });

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: columns, // Column count not the same as the number count.
        getScrollElement: () => scrollParentRef.current,
        estimateSize: () => itemWidth ?? 0, // Colmun 
        overscan,
    });

    const totalListHeight = rowVirtualizer.getTotalSize();
    const totalListWidth = columnVirtualizer.getTotalSize();
    const virtualRows = rowVirtualizer.getVirtualItems();
    const virtualColumns = columnVirtualizer.getVirtualItems();

    // Resize column number
    useEffect(() => {

        const updateColumns = () => {
            if (scrollParentRef.current && isGrid && itemWidth) {
                const containerWidth = scrollParentRef.current.offsetWidth;
                const newColumns = Math.floor(containerWidth / itemWidth);

                setColumns(newColumns || 1); // Ensure at least one column
            }
        };

        updateColumns();

        window.addEventListener("resize", updateColumns);

        return () => {
            window.removeEventListener("resize", updateColumns);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGrid, itemWidth, scrollParentRef.current]);

    return {
        scrollParentRef,
        totalListHeight,
        virtualRows,
        totalListWidth,
        virtualColumns,
        columns,
    }
};


export default useVirtualization;