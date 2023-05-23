import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

export class Welcome extends Component {
  static propTypes = {

  }

  render() {
    return (
      <Box borderWidth='0px' borderRadius='lg' bg={'rgba(45, 53, 80, 0.8)'} w={'15rem'} h={'15rem'} boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} color={'white'}>
        <Box p='6' >
          <h1>Welcome</h1>
        </Box>
      </Box>
    )
  }
}

export default Welcome
