import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Welcome from '../welcome-box/Welcome'
import Weather from '../weather-box/Weather'
import Tasks from '../task-box/Tasks'
import { AbsoluteCenter } from '@chakra-ui/react'

export class Main extends Component {
  static propTypes = {

  }

  render() {
    return (
      <AbsoluteCenter style={{zIndex: 1}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '1rem'}}>
          <Welcome />
          <Weather />
        </div>
        <div style={{marginTop: '20px'}}>
          <Tasks />
        </div>
      </AbsoluteCenter>
    )
  }
}

export default Main
