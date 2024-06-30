

import { Box } from '@chakra-ui/react'
import HomeNavbar from './HomeNavbar'

const HomeLayout = () => {
  return (
    <Box px={8} py={4} bg={"white-bg.100"} minH="100vh">
        <HomeNavbar />
    </Box>
  )
}

export default HomeLayout