
import { extendTheme } from "@chakra-ui/react";

import '@fontsource/jetbrains-mono'

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
        'header-green': createCustomColorObject('#88F33C'),
        'white-bg': createCustomColorObject('#FBFFF8'),
        'white-txt': createCustomColorObject('#FBFFF8'),
        'dark-green': createCustomColorObject('#4A8E80'),
    },
    fonts: {
        heading: `'JetBrains Mono', sans-serif`,
        body: `'JetBrains Mono', sans-serif`, 
    }
})
