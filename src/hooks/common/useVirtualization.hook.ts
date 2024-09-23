import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";


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

    const scrollParentRef = useRef<HTMLDivElement>(null)

    // Row virtualizer. Can be used for simple table or for grid.
    const rowVirtualizer = useVirtualizer({
        // count: flatData ? hasNextPage ? flatData.length + 1 : flatData.length : 0,
        count: items ? isGrid ? items.length / 5 : items.length : 0,
        getScrollElement: () => scrollParentRef.current,
        estimateSize: () => itemHeight,
        overscan,
    });

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: 5, // Column count not the same as the number count.
        getScrollElement: () => scrollParentRef.current,
        estimateSize: () => itemWidth ?? 192, // Colmun 
        overscan,
    });

    const totalListHeight = rowVirtualizer.getTotalSize();
    const totalListWidth = columnVirtualizer.getTotalSize();   
    const virtualRows = rowVirtualizer.getVirtualItems();
    const virtualColumns = columnVirtualizer.getVirtualItems();

    return {
        scrollParentRef,
        totalListHeight,
        virtualRows,
        totalListWidth,
        virtualColumns,
    }
};


export default useVirtualization;