import { IRecipe } from "../../types/recipe.types";

export const mockRecipes: IRecipe[] = [
    {
        id: 1,
        title: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with a rich, meaty sauce.',
        isPublic: true,
        image: 'https://feelgoodfoodie.net/wp-content/uploads/2023/04/Pasta-Bolognese-TIMG.jpg',
        ingredients: [
            {
                id: 1,
                name: 'Spaghetti',
                quantity: 200,
                unit: 'g',
                recipeId: 1,
            },
            {
                id: 2,
                name: 'Minced Meat',
                quantity: 300,
                unit: 'g',
                recipeId: 1,
            },
            {
                id: 3,
                name: 'Tomato Sauce',
                quantity: 1,
                unit: 'cup',
                recipeId: 1,
            },
        ],
        instructions: [
            'Cook the pasta according to the package instructions.',
            'Heat the oil in a pan and cook the onions until soft.',
            'Add the minced meat and cook until browned.',
            'Stir in the tomato sauce and let simmer for 20 minutes.',
            'Serve the sauce over the pasta.',
        ],
        likedBy: [], // User IDs who liked the recipe
        cookbooks: [], // Assuming you have cookbook relationships to add here
        users: [], // Assuming you have user-recipe relationships to add here
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: 2,
        createdBy: 1,
        createdByUser: {
            "id": 1,
            "email": "miguelbento2000@gmail.com",
            "firstName": "Miguel",
            "lastName": "Bento",
            "fullName": "Miguel Bento",
            "avatar": "https://lh3.googleusercontent.com/a/ACg8ocKPmBf-qtDhF9LubLmxpO-yi3cSkz5iSvbZ6ASj7mtGIIfkYA=s96-c",
            "createdAt": "2024-07-08T07:57:56.710Z",
            "updatedAt": "2024-07-08T07:57:56.710Z"
        }
    },
    // {
    //     id: 2,
    //     title: 'Chicken Curry',
    //     description: 'A flavorful and spicy chicken curry.',
    //     image: 'https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg',
    //     isPublic: false,
    //     ingredients: [
    //         {
    //             id: 4,
    //             name: 'Chicken Breast',
    //             quantity: 500,
    //             unit: 'g',
    //             recipeId: 2,
    //         },
    //         {
    //             id: 5,
    //             name: 'Coconut Milk',
    //             quantity: 1,
    //             unit: 'can',
    //             recipeId: 2,
    //         },
    //     ],
    //     instructions: [
    //         'Heat oil in a large pot over medium heat.',
    //         'Add onions, garlic, and ginger; cook until onions are soft.',
    //         'Stir in the spices and cook for 1 minute.',
    //         'Add chicken pieces and cook until browned.',
    //         'Pour in the coconut milk and simmer for 30 minutes.',
    //         'Serve with rice.',
    //     ],
    //     likedBy: [], // User IDs who liked the recipe
    //     cookbooks: [], // Assuming you have cookbook relationships to add here
    //     users: [], // Assuming you have user-recipe relationships to add here
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     updatedBy: 1,
    //     createdBy: 3,
    //     createdByUser: {
    //         "id": 1,
    //         "email": "miguelbento2000@gmail.com",
    //         "firstName": "Miguel",
    //         "lastName": "Bento",
    //         "fullName": "Miguel Bento",
    //         "avatar": "https://lh3.googleusercontent.com/a/ACg8ocKPmBf-qtDhF9LubLmxpO-yi3cSkz5iSvbZ6ASj7mtGIIfkYA=s96-c",
    //         "createdAt": "2024-07-08T07:57:56.710Z",
    //         "updatedAt": "2024-07-08T07:57:56.710Z"
    //     }
    // },
];



// ACTION MODAL IDS
export const RECIPE_ACTION_MODAL_IDS = {
    DELETE: 'delete_recipe_modal',
    ADD_TO_ADD_COOKBOOK: 'add_recipe_to_cookbook_modal'
}