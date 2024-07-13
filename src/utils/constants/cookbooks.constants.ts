import { ICookbook } from "../../types";




export const mockCookbooks: ICookbook[] = [
    {
        id: 1,
        title: "Test cookbook",
        isPrivate: true,
        image: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg',
        users: [],
        recipes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 1,
        createdBy: 1,
    }
]