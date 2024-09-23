import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";


type IUseVirtualizationInput<T> = {
    itemHeight: number;
    itemWidth?: number;
    items?: T[];
    overscan?: number;
    isGrid?: boolean;
}


const useVirtualization = <T>({
    itemHeight,
    itemWidth,
    items,
    overscan = 5,
    isGrid = false,
}: IUseVirtualizationInput<T>) => {

    const [columns, setColumns] = useState<number>(1);

    const scrollParentRef = useRef<HTMLDivElement>(null)

    // Row virtualizer. Can be used for simple table or for grid.
    const rowVirtualizer = useVirtualizer({
        // count: flatData ? hasNextPage ? flatData.length + 1 : flatData.length : 0,
        count: items ? isGrid ? Math.ceil(items.length / columns) : items.length : 0,
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
    }, [isGrid, itemWidth, scrollParentRef]);

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