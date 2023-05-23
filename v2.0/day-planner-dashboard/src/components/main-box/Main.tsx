import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Welcome from '../welcome-box/Welcome'
import Weather from '../weather-box/Weather'
import Tasks from '../task-box/Tasks'

export class Main extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div style={{position: 'absolute', zIndex: 1, top: '20%', left: '30%'}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
          <div style={{marginRight: '30px'}}>
            <Welcome />
          </div>
          <div>
            <Weather />
          </div>
        </div>
        <div style={{marginTop: '25px'}}>
          <Tasks />
        </div>
      </div>
    )
  }
}

export default Main
