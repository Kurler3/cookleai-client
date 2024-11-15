import { useState } from "react";




const useContextMenu = () => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent default context menu
        setIsContextMenuOpen(true)

    };

    const closeMenu = () => {
        setIsContextMenuOpen(false);
    };

    return {
        isContextMenuOpen,
        handleContextMenu,
        closeMenu,
    }

};

export default useContextMenu;