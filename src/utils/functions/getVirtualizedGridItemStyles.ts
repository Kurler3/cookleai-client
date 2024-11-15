import { VirtualItem } from "@tanstack/react-virtual"
import { CSSProperties } from "react";



export default function getVirtualizedGridItemStyles({
    virtualColumn,
    virtualRow,
}: {
    virtualColumn: VirtualItem;
    virtualRow: VirtualItem;
}) {

    return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${virtualColumn?.size}px`,
        height: `${virtualRow?.size}px`,
        transform: `translateX(${virtualColumn?.start + (10 * virtualColumn.index)}px) translateY(${virtualRow?.start + (10 * virtualRow.index)}px)`,
    } as CSSProperties;

}