import React, { Component } from 'react'
import { AbsoluteCenter, Box, Button, Center, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

const Login = ({loggedIn = false, name = ''}) => {
  
  return (
    <Flex w={"100vw"} h={"100vh"} alignContent={"center"} justifyContent={"center"} bg={'rgba(87, 98, 138, 1)'}>
        <AbsoluteCenter>
          <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '25em', '2xl':'20em'}} h={{base: '10em', '2xl':'20em'}} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
            {/* <Box>
              <Center>
                <Text fontSize={{base:'4xl', '2xl':'5xl'}} >DayPlanner</Text>
              </Center>
            </Box> */}
            <Box pt={'1'} pl={'5'} pr={'5'}>
              <Flex direction={'row'} wrap={'nowrap'} pt={'3'} gap={'0.5em'}>
                <Input placeholder='Enter your name...' size={'lg'}/>
                <Button colorScheme='blue' size={'lg'}>Continue</Button>
              </Flex>
            </Box>
            <Box>
              <Center pt={'5'}>
                <Divider w={'95%'} />
              </Center>
            </Box>
            <Box p={'5'}>
              <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
            </Box>
          </Box>
      </AbsoluteCenter>
    </Flex>
    )
  }

export default Login
