import { ICookbookRole, IRecipeRole } from "@/types";


export default function getRoleColor(role?: IRecipeRole | ICookbookRole) {
    if (!role) return '';
    // Convert role to uppercase to handle case-insensitive input
    switch (role.toUpperCase()) {
        case 'OWNER':
            return 'text-blue-700';
        case 'EDITOR':
            return 'text-orange-500'; // Yellow color for Editor
        case 'VIEWER':
            return 'text-green-500'; // Gray color for Viewer
        default:
            return '';               // Return null for undefined roles
    }
}
