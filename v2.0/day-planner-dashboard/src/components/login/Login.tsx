import React, { Component } from 'react'
import { AbsoluteCenter, Box, Text } from '@chakra-ui/react'

export class Login extends Component {
  static propTypes = {

  }

  render() {
    return (
      <AbsoluteCenter>
        <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '15em', '2xl':'20em'}} h={{base: '15em', '2xl':'20em'}} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
            <Box p='6' >
            <Text fontSize={{base:'4xl', '2xl':'5xl'}} noOfLines={2}>Welcome, Mitch</Text>
            </Box>
        </Box>
      </AbsoluteCenter>
    )
  }
}

export default Login
