import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'

export class Welcome extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={{base: '20em'}} h={'20rem'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
        <Box p='6' >
          <Text fontSize='5xl' noOfLines={2}>Welcome, Mitch</Text>
          <Text fontSize='md' marginTop={'1em'}>Add something here</Text>
          <Text fontSize='md' marginTop={'1em'}>Add something else here</Text>
        </Box>
      </Box>
    )
  }
}

export default Welcome
