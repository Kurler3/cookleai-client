'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Icon,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons'
import LoginIcon from '@mui/icons-material/Login';

import logo from '../../assets/images/logo.png'

export default function HomeNavbar() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box w='full'>
            <Flex
                bg={'transparent'}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>

                <Flex
                    flex={{ md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex flex={{ base: 1 }} align={'center'} justify={{ base: 'center', md: 'start' }}>


                    {/* LOGO */}
                    <Flex
                        gap={4}
                        justify={'center'}
                        align={'center'}
                        as='a'
                        href='/'
                    >

                        <Image
                            src={logo}
                            alt='Logo'
                            display={{ base: 'none', md: 'block' }}
                        />

                        {/* TITLE */}
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={'dark-green.100'}
                            fontSize={{ base: "sm", md: "md", lg: "2xl" }}
                            fontWeight={'bold'}
                            ml={{base: "-30px", md: 0}}

                        >
                            CookleAI
                        </Text>

                    </Flex>


                    <Flex flex={1} justifyContent={'flex-end'} px={10} display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>


                <Flex
                    gap={4}
                    justifyItems={'center'}
                    alignItems={'center'}
                    display={{ base: 'none', md: 'flex' }}
                >

                    {/* Login */}
                    <Button
                        as={'a'}
                        href='/login'
                        bg={'transparent'}
                        color="header-green.100"
                        _hover={{
                            bg: 'transparent',
                            cursor: 'pointer',
                            color: 'lightgreen-hover.100'
                        }}
                    >
                        Login
                    </Button>

                    {/* Get started btn */}
                    <Button
                        as={'a'}
                        fontSize={{ base: '8px', md: '15px' }}
                        fontWeight={600}
                        color={'white'}
                        colorScheme={'lightgreen'}
                        href={'#'}
                        _hover={{
                            bg: 'lightgreen-hover.100',
                        }}
                        size={{ base: 'xs', md: "md" }}
                    >

                        Get Started for free
                        <Icon as={LoginIcon} ml="6px" />
                    </Button>
                </Flex>


            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Box
                        as="a"
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={navItem.color ?? linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: navItem.hoverColor ?? linkHoverColor,
                        }}>
                        {navItem.label}
                    </Box>

                </Box>
            ))}
        </Stack>
    )
}

const MobileNav = () => {
    return (
        <Flex
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            gap={2}
            display={{ md: 'none' }}
        >

            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}

            {/* Login */}
            <Stack spacing={4} py={2}>
                <Text
                    as={'a'}
                    href='/login'
                    bg={'transparent'}
                    color="header-green.100"
                    textAlign={'left'}
                    _hover={{
                        bg: 'transparent',
                        cursor: 'pointer',
                        color: 'lightgreen-hover.100'
                    }}
                >
                    Login
                </Text>
            </Stack>

            <Stack spacing={4} py={2}>
                {/* Get started btn */}
                <Button
                    as={'a'}
                    fontSize={{base: '10px', sm: '13px'}}
                    fontWeight={600}
                    color={'white'}
                    colorScheme={'lightgreen'}
                    href={'#'}
                    _hover={{
                        bg: 'lightgreen-hover.100',
                    }}
                    size={"md"}
                >
                    Get Started for free

                    <Icon as={LoginIcon}  ml="6px" />
                </Button>
            </Stack>

        </Flex>
    )
}

const MobileNavItem = ({ label, href }: NavItem) => {

    return (
        <Stack spacing={4}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
            </Box>
        </Stack>
    )
}

interface NavItem {
    label: string;
    color?: string;
    hoverColor?: string;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Explore',
        color: "header-green.100",
        hoverColor: 'lightgreen-hover.100',
    },
    {
        label: 'About',
    },
]