
import { extendTheme } from "@chakra-ui/react";

function createCustomColorObject(color: string) {
    return {
        100: color,
        200: color,
        300: color,
        400: color,
        500: color,
        600: color,
        700: color,
        800: color,
        900: color,
    }
}

export const theme = extendTheme({
    colors: {
        'lightgreen': createCustomColorObject('#78E22D'),
        'lightgreen-hover': createCustomColorObject('#5FCD11'),
        'header-green': createCustomColorObject('#88F33C')
    }
})
